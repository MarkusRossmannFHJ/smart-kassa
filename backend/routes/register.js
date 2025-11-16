import express from "express";
import argon2 from "argon2";
import pool from "../db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

// User Registration Endpoint (new user registration)
router.post("/", async (req, res) => {
  const { first_name, last_name, email, phone_number, password, business } =
    req.body;

  try {
    // validate input (if missing fields or something wrong)

    if (!first_name || !last_name || !email || !password || !business) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const checkuser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkuser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // hash password
    const hashedPassword = await argon2.hash(password);

    /**
     * en: insert user in users table
     * ar: lo kol 7aga tmam mostakhdem gedid fi el sando2
     */
    const userRes = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone_number, business)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id`,
      [first_name, last_name, email, phone_number, business]
    );

    // get the newly created user id
    const userId = userRes.rows[0].user_id;

    const payload = {
      userId: userId,
      email: email,
      name: `${first_name} ${last_name}`,
      business: business,
    };

    // generate JWT Token
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ userId: userId });

    /**
     * en: insert account record
     * ar: dakhal el 7esab fi el gadwal
     */
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await pool.query(
      `INSERT INTO account (user_id, name, password_hash, created_on, refresh_token, token_expiress_at)
       VALUES ($1, $2, $3, NOW(), $4, $5)`,
      [
        userId,
        `${first_name} ${last_name}`,
        hashedPassword,
        refreshToken,
        expiresAt,
      ]
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: userId,
        name: `${first_name} ${last_name}`,
        email: email,
        business: business,
      },
    });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

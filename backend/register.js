// register.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import argon2 from "argon2";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// User Registration Endpoint (new user registration)
app.post("/register", async (req, res) => {

const { first_name, last_name, email, phone_number, password,business } = req.body;


  try {
    // validate input(if missing fields or something wrong)

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const checkuser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkuser.rows.length > 0) {
      return  res.status(400).json({ error: "User with this email already exists" });
    }

    // hash password
    const hashedPassword = await argon2.hash(password);

    // insert user in users table( lo kol 7aga tmam mostakhdem gedid fi el sando2 )
      const userRes = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone_number)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id`,
      [first_name, last_name, email, phone_number]
    );
    
    // get the newly created user id
    const userId = userRes.rows[0].user_id;

    // insert account record (dakhal el 7esab fi el gadwal )
    await pool.query(
      `INSERT INTO account (user_id, name, password_hash, created_on)
       VALUES ($1, $2, $3, NOW())`,
      [userId, `${first_name} ${last_name}`, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running and connected to Railway Database");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

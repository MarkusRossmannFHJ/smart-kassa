import express from "express";
import pool from "../db.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";

// Um Api End Point's in anderen Dateien zu haben brauchen wir ein router
const router = express.Router();

router.post("/", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Check if token exists in database and not revoked
    const tokenRes = await pool.query(
      `SELECT * FROM account 
       WHERE refresh_token = $1 AND user_id = $2 AND token_expiress_at > NOW()`,
      [refreshToken, decoded.userId]
    );

    if (tokenRes.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Refresh token expired or revoked" });
    }

    // Get user info
    const userRes = await pool.query(
      `SELECT user_id, first_name, last_name, email, business
       FROM users
       WHERE user_id = $1`,
      [decoded.userId]
    );

    const user = userRes.rows[0];

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      business: user.business,
    });

    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error("Error in /refresh:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
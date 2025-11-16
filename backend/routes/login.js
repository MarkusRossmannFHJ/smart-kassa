import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT account_id, password_hash FROM account WHERE name = $1",
            [name]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = result.rows[0];

        const valid = await argon2.verify(user.password_hash, password);
        if (!valid) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const token = jwt.sign({ userId: user.id, name }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/", (req, res) => {
    res.send("Server running ...");
})

export default router;
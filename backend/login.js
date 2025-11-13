import express from "express";
import pg from "pg";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Was habt ihr im Frontend als feld bei name und password?
app.post("/login", async (req, res) => {
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

app.listen(process.env.PGPORT || 3000, () =>
    console.log(`Server running on port: ${process.env.PGPORT || 3000}`)
);
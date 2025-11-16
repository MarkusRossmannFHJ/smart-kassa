import pg from "pg";
import dotenv from "dotenv";
import pool from "../backend/db.js"

dotenv.config();

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_PUBLIC_URL,
//     ssl: { rejectUnauthorized: false },
// });

async function testDB() {
    try {
        const result = await pool.query("SELECT * FROM account LIMIT 3");
        console.log("Connection successful");
        console.table(result.rows);
    } catch (err) {
        console.error("Error while connecting to database:", err);
    } finally {
        await pool.end();
    }
}

testDB();
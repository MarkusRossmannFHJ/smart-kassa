/**
 * Database connection pool configuration
 * Creates a PostgreSQL connection pool that manages database connections
 * throughout the application lifecycle
 * @author Casper Zielinski
 * @author Mario Shenouda
 */

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

/**
 * PostgreSQL connection pool instance
 * Connects using DATABASE_URL from environment variables
 * SSL is enabled in production for secure connections
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

/**
 * Error handler for unexpected database errors
 * Exits the process to prevent running with corrupted connection pool
 */
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;

-- ⚠️ DOCUMENTATION ONLY - DO NOT EXECUTE
-- This schema already exists in Railway production database
-- This file is for reference and local development setup only

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT,
  business TEXT,
);

CREATE TABLE IF NOT EXISTS account (
  account_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_on DATE DEFAULT CURRENT_DATE
  users_id INT REFERENCES users(user_id),
  refresh_token TEXT,
);

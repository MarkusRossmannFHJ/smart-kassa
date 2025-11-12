CREATE TABLE IF NOT EXISTS users (
  users_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT
);

CREATE TABLE IF NOT EXISTS account (
  account_id SERIAL PRIMARY KEY,
  users_id INT REFERENCES users(users_id),
  business TEXT,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_on DATE DEFAULT CURRENT_DATE
);

import express from "express";
import { body, validationResult } from "express-validator";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { randomUUID } from "crypto";
import argon2 from "argon2";
import "dotenv/config";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const EMAIL_LOWER = (s) => String(s || "").trim().toLowerCase();

// --- Security & Middleware ---
app.set("trust proxy", 1);

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(
  helmet({
    contentSecurityPolicy:
      NODE_ENV === "production"
        ? {
            useDefaults: true,
            directives: {
              "default-src": ["'self'"],
              "img-src": ["'self'", "data:"],
              "script-src": ["'self'"],
              "style-src": ["'self'", "'unsafe-inline'"],
            },
          }
        : false,
  })
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: { write: (msg) => console.log(msg.trim()) },
  })
);

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Validators ---
const urlOpts = { protocols: ["http", "https"], require_protocol: true };
const isPhoneLoose = (v) => /^\+?[0-9 ()-]{6,}$/.test(String(v || "").trim());

// --- POST /api/register ---
app.post(
  "/api/register",
  registerLimiter,
  [
    body("first_name").trim().notEmpty().withMessage("Vorname erforderlich."),
    body("last_name").trim().notEmpty().withMessage("Nachname erforderlich."),
    body("email").trim().isEmail().withMessage("Ungültige E-Mail.").bail().customSanitizer(EMAIL_LOWER),
    body("phone_number").custom(isPhoneLoose).withMessage("Telefonnummer ungültig."),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Passwort zu schwach (>=8, Groß/Klein, Zahl, Symbol)."),
    body("account_name").notEmpty().withMessage("Account-Name ist erforderlich."),
    body("business").optional({ nullable: true }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }

      const { first_name, last_name, email, phone_number, password, account_name, business } = req.body;

      // --- Check if email exists ---
      const { rows: existing } = await pool.query("SELECT users_id FROM users WHERE email = $1", [email]);
      if (existing.length > 0) {
        return res.status(409).json({ ok: false, message: "E-Mail bereits registriert." });
      }

      // --- Hash password with Argon2 ---
      const password_hash = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64MB
        timeCost: 3,
        parallelism: 1,
      });

      // --- Insert into users ---
      const insertUser = `
        INSERT INTO users (first_name, last_name, email, phone_number)
        VALUES ($1, $2, $3, $4)
        RETURNING users_id
      `;
      const { rows: userRows } = await pool.query(insertUser, [first_name, last_name, email, phone_number]);
      const users_id = userRows[0].users_id;

      // --- Insert into account ---
      const insertAccount = `
        INSERT INTO account (users_id, business, name, password_hash, created_on)
        VALUES ($1, $2, $3, $4, CURRENT_DATE)
        RETURNING account_id
      `;
      const { rows: accRows } = await pool.query(insertAccount, [
        users_id,
        business || null,
        account_name,
        password_hash,
      ]);

      const account_id = accRows[0].account_id;

      res.status(201).json({
        ok: true,
        message: "Registrierung erfolgreich.",
        data: { users_id, account_id },
      });
    } catch (err) {
      console.error("❌ Error in /api/register:", err);
      next(err);
    }
  }
);

// --- Health check ---
app.get("/health", (_req, res) => res.json({ ok: true }));

// --- Error handling ---
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Registration API läuft auf http://localhost:${PORT}`);
});

import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { randomUUID } from "crypto";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const EMAIL_LOWER = (s) => String(s || "").trim().toLowerCase();

// --- In-memory demo store ---
const users = []; // [{ id, email, ... }]

// --- Security & middleware ---
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
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);

// request-id for observability
app.use((req, _res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  next();
});

// Minimal log without dumping bodies
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms reqid=:req[id]", {
    stream: { write: (msg) => console.log(msg.trim()) },
  })
);

// Rate limit registration to reduce abuse
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // tune as needed
  standardHeaders: true,
  legacyHeaders: false,
});

// Basic format checks (add checksum later)
const isATUFormat = (v) => /^ATU\d{8}$/i.test(String(v).trim());
const isFNFormat = (v) => /^(FN\s*)?[0-9]{1,6}[a-zA-Z]?$/i.test(String(v).trim());
const isPhoneLoose = (v) => /^\+?[0-9 ()-]{6,}$/.test(String(v || "").trim());

const urlOpts = { protocols: ["http","https"], require_protocol: true, allow_underscores: true };

// --- POST /api/register ---
app.post(
  "/api/register",
  registerLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name ist erforderlich."),
    body("email").trim().isEmail().withMessage("Ungültige E-Mail.").bail()
      .customSanitizer(EMAIL_LOWER),
    body("password")
      .isStrongPassword({
        minLength: 8, minLowercase: 1, minUppercase: 1,
        minNumbers: 1, minSymbols: 1,
      })
      .withMessage("Passwort zu schwach (>=8, Groß/Klein, Zahl, Symbol)."),
    body("atu")
      .custom((v) => isATUFormat(v))
      .withMessage("ATU-Nummer ungültig (Format: ATU########)."),
    body("fn")
      .custom((v) => isFNFormat(v))
      .withMessage("Firmenbuchnummer (FN) ungültig."),
    body("phone")
      .custom((v) => isPhoneLoose(v))
      .withMessage("Telefonnummer ungültig."),
    body("website")
      .optional({ nullable: true, checkFalsy: true })
      .isURL(urlOpts).withMessage("Website-URL ungültig."),
    body("social")
      .optional({ nullable: true, checkFalsy: true })
      .isURL(urlOpts).withMessage("Social-URL ungültig."),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }

      const { name, email, password, atu, fn, phone, website, social } = req.body;

      // Email uniqueness (case-insensitive)
      const emailNorm = EMAIL_LOWER(email);
      const exists = users.find((u) => u.email === emailNorm);
      if (exists) {
        // Consider returning generic message to avoid enumeration if desired
        return res.status(409).json({ ok: false, message: "E-Mail bereits registriert." });
      }

      const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
      const passwordHash = await bcrypt.hash(password, rounds);

      const user = {
        id: String(users.length + 1), // or randomUUID() in real system
        name: String(name).trim(),
        email: emailNorm,
        passwordHash,
        atu: String(atu).toUpperCase().trim(),
        fn: String(fn).toUpperCase().replace(/^FN\s*/i, "").trim(),
        phone: String(phone).trim(),
        website: website || null,
        social: social || null,
        createdAt: new Date().toISOString(),
      };

      users.push(user);

      res
        .status(201)
        .set("Location", `/api/users/${user.id}`)
        .json({
          ok: true,
          message: "Registrierung erfolgreich.",
          data: { userId: user.id },
          links: { login: "/login" },
        });
    } catch (err) {
      next(err);
    }
  }
);

app.get("/health", (_req, res) => {
  const payload = { ok: true };
  if (NODE_ENV !== "production") payload.users = users.length;
  res.json(payload);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not found" });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(`reqid=${req.id}`, err);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Registration API läuft auf http://localhost:${PORT}`);
});

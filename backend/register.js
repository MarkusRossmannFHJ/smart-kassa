
// Endpunkt: POST /api/register
// Felder (required): name, email, password, atu, fn, phone
// Felder (optional): website, social
// Antwort: JSON + Location-Header (/login) bei Erfolg

import express from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// --- Einfache In-Memory-"Datenbank" (nur für Demo) ---
const users = []; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());                  
app.use(cors());                    
app.use(express.json());            
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev"));             

// --- Hilfsfunktionen (einfache Validierungen) ---
const isATU = (v) => /^ATU\d{8}$/.test(v);            // z.B. ATU12345678
const isFN  = (v) => /^[0-9]{1,6}[a-zA-Z]?$/.test(v); // grob: 1-6 Ziffern + optional Buchstabe
const isPhone = (v) => /^\+?[0-9 ()-]{6,}$/.test(v);  

// --- POST /api/register ---
app.post(
  "/api/register",
  [
    // Validierungsregeln (Server-seitig)
    body("name").trim().notEmpty().withMessage("Name ist erforderlich."),
    body("email").isEmail().withMessage("Ungültige E-Mail."),
    body("password")
      .isStrongPassword({
        minLength: 8, minLowercase: 1, minUppercase: 1,
        minNumbers: 1, minSymbols: 1
      })
      .withMessage("Passwort zu schwach (>=8, Groß/Klein, Zahl, Symbol)."),
    body("atu").custom((v) => isATU(v)).withMessage("ATU-Nummer ungültig (Format: ATU########)."),
    body("fn").custom((v) => isFN(v)).withMessage("Firmenbuchnummer (FN) ungültig."),
    body("phone").custom((v) => isPhone(v)).withMessage("Telefonnummer ungültig."),
    body("website")
      .optional({ nullable: true, checkFalsy: true })
      .isURL().withMessage("Website-URL ungültig."),
    body("social")
      .optional({ nullable: true, checkFalsy: true })
      .isURL().withMessage("Social-URL ungültig.")
  ],
  async (req, res) => {
    // 1) Validierungsergebnisse prüfen
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 mit Fehlerdetails (Frontend kann Toast/Fehlermeldungen daraus bauen)
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

    const { name, email, password, atu, fn, phone, website, social } = req.body;

    // 2) E-Mail muss eindeutig sein (hier gegen Memory-Array geprüft)
    const exists = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
    if (exists) {
      return res.status(409).json({ ok: false, message: "E-Mail bereits registriert." });
    }

    // 3) Passwort hashen
    const passwordHash = await bcrypt.hash(password, 10);

    // 4) Benutzer speichern (Demo)
    const user = {
      id: users.length + 1,
      name,
      email: String(email).toLowerCase(),
      passwordHash,
      atu,
      fn,
      phone,
      website: website || null,
      social: social || null,
      createdAt: new Date().toISOString()
    };
    users.push(user);

    // 5) Erfolg: 201 + Location Header für spätere Weiterleitung durch das Frontend
    res.status(201)
      .set("Location", "/login")
      .json({ ok: true, message: "Registrierung erfolgreich.", userId: user.id });
  }
);

// --- (Optional) Healthcheck/Info ---
app.get("/health", (_req, res) => {
  res.json({ ok: true, users: users.length });
});

// --- Serverstart ---
app.listen(PORT, () => {
  console.log(`Registration API läuft auf http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import refreshRoutes from "./routes/refresh.js";
import registerRoutes from "./routes/register.js";
import loginRoutes from "./routes/login.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/refresh", refreshRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);

// HealthCheck
app.get("/", (_, res) => {
  res.send("SmartKassa API - Server running");
});

// Error handling for routes that are not found
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SmartKassa API running on port ${PORT}`);
});
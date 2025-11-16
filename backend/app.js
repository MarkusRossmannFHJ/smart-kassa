import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import refreshRoutes from "./routes/refresh.js";
import registerRoutes from "./routes/register.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// ROUTES
app.use("/refresh", refreshRoutes);
app.use("/register", registerRoutes);

// Health Check
app.get("/", (_, res) => {
  res.send("SmartKasse API - Server running");
});

// Error Handling for not found routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SmartKasse API running on port ${PORT}`);
});

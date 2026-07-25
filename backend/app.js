import express from "express";
import cors from "cors";
import auditRoutes from "./routes/audit.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://page-pulse-six-rust.vercel.app",
    ],
  })
);
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Page Pulse API is running",
  });
});

// API Routes
app.use("/api", auditRoutes);

export default app;
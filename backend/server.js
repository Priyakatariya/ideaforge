// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
// 1. You correctly import the onboarding routes here
const onboardingRoutes = require("./routes/onboarding"); 
const aiRoutes = require("./routes/aiRoutes");
const simulationRoutes = require("./routes/simulationRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Database Connection (MongoDB) ---
const connectDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.log("⚠️ Server will continue to run, but database operations will fail.");
    // Removed process.exit(1) to allow the server to stay up and provide feedback
  }
};

connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
// Use /api prefix to match .env configuration
app.use("/api/auth", authRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/simulation', simulationRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.send('Server is running. API routes are under /api (e.g., /api/auth, /api/onboarding).');
});


// --- Server Start ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
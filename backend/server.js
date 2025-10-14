// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS middleware
const authRoutes = require("./routes/authRoutes"); // Import your auth router

// Load environment variables from .env file
dotenv.config();

const app = express();

// --- Database Connection ---
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    // Exit process with failure code
    process.exit(1);
  }
};

connectDB();

// --- Middleware ---
// 1. CORS: Allows your React frontend (e.g., on port 3000) to access the backend (on port 5000)
// For a production environment, you should restrict origins instead of using '*'
app.use(cors());

// 2. Body Parser: Allows the app to read JSON data sent in the request body (req.body)
app.use(express.json());

// --- Routes ---
// Mount the authentication router under the '/auth' base path.
// This means all routes in authRoutes will now be prefixed with /auth
// e.g., POST /auth/register and POST /auth/login
app.use("/auth", authRoutes);

// Simple test route (Optional)
app.get('/', (req, res) => {
    res.send('Server is running. Navigate to /auth/register to sign up.');
});


// --- Server Start ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
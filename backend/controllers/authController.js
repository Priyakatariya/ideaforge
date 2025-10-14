// D:\gssoc\veritas\backend\controllers\authController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FIX: Functions defined as 'const' so they can be exported correctly.
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already registered with this email." });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // 3. Create the new user
        user = await User.create({ name, email, password: hashed });

        // 4. Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.status(200).json({ 
            message: "✅ User Registered Successfully", 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });

    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ error: "Server Error during registration." });
    }
};

const login = async (req, res) => {
    // ... (Login logic)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid Credentials (User not found)" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials (Wrong password)" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.status(200).json({ 
            message: "✅ Login Successful", 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
        
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: "Server Error during login." });
    }
};

// FIX: Correct export syntax
module.exports = { register, login };
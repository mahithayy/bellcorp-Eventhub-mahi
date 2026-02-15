const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // Accept name from body
  if (await User.findOne({ email }))
    return res.status(400).json({ message: "User exists" });

  // Create user with name
  const user = await User.create({ name, email, password });
  res.json({ message: "Registered", user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET);

  // Return the user's name along with the token
  res.json({ token, user: { name: user.name, email: user.email } });
});

module.exports = router;

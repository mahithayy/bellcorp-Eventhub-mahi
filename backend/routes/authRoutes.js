const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User exists" });
  }

  const user = await User.create({ name, email, password });

  res.json({ message: "Registered", user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  // ✅ MUST be inside route
  res.json({ user: { name: user.name, email: user.email } });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.json({ message: "Logged out" });
});

module.exports = router;

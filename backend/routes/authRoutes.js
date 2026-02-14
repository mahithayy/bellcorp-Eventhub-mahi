const express = require("express");
const jwt = require("jsonwebtoken");
const { users } = require("../data/db");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: "User exists" });

  const newUser = { id: Date.now().toString(), email, password };
  users.push(newUser);
  res.json({ message: "Registered successfully" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
  res.json({ token });
});

module.exports = router;

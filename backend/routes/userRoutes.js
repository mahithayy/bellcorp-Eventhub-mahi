const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Event = require("../models/Event");
const { authMiddleware } = require("../middleware/auth");

// GET /api/user/me - Fetch current user's name and details
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Find user by ID (from token) but exclude the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  const events = await Event.find({ registeredUsers: req.user.id });
const allPast = await Event.find({ datetime: { $lt: new Date() } });
  res.json({
    registered: events,
    upcoming: events.filter(e => new Date(e.datetime) > new Date()),
    past: allPast
  });
});

module.exports = router;


const express = require("express");
const Event = require("../models/Event");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
  const events = await Event.find({ registeredUsers: req.user.id });

  res.json({
    registered: events,
    upcoming: events.filter(e => new Date(e.datetime) > new Date()),
    past: events.filter(e => new Date(e.datetime) <= new Date())
  });
});

module.exports = router;


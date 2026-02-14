const express = require("express");
const { events } = require("../data/db");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  const userEvents = events.filter(e =>
    e.registeredUsers.includes(req.user.id)
  );

  res.json({
    registered: userEvents,
    upcoming: userEvents.filter(e => new Date(e.datetime) > new Date()),
    past: userEvents.filter(e => new Date(e.datetime) <= new Date())
  });
});

module.exports = router;

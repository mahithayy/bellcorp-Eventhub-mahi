const express = require("express");
const { events } = require("../data/db");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// Get all events (with filters & search)
router.get("/", (req, res) => {
  const { search, location, category, date } = req.query; // Added 'date'
  let filtered = events;

  if (search) {
    filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (location) filtered = filtered.filter(e => e.location === location);
  if (category) filtered = filtered.filter(e => e.category === category);
  if (date) filtered = filtered.filter(e => e.datetime === date); // Simple date match

  res.json(filtered);
});

// Get single event
router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  res.json(event);
});

// Register for event
router.post("/:id/register", authMiddleware, (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (event.registeredUsers.includes(req.user.id))
    return res.status(400).json({ message: "Already registered" });
  if (event.registeredUsers.length >= event.capacity)
    return res.status(400).json({ message: "Event full" });

  event.registeredUsers.push(req.user.id);
  res.json({ message: "Registered!" });
});

// Cancel registration
router.post("/:id/cancel", authMiddleware, (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (event) {
    event.registeredUsers = event.registeredUsers.filter(id => id !== req.user.id);
  }
  res.json({ message: "Registration cancelled" });
});

module.exports = router;
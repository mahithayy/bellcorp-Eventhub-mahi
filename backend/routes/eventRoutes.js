const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { authMiddleware } = require("../middleware/auth");

// GET /api/events - Get all events (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { search, location, category, date } = req.query;
    let query = {};

    // specific search logic matching your frontend filters
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (location) {
      query.location = location;
    }
    if (category) {
      query.category = category;
    }

    // Fetch events from Mongo
    const events = await Event.find(query);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/events/:id/register - Register user for an event
router.post("/:id/register", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered
    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Check capacity
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/events/:id/cancel - Cancel registration
router.post("/:id/cancel", authMiddleware, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: "Event not found" });

      // Remove user from array
      event.registeredUsers = event.registeredUsers.filter(
          userId => userId.toString() !== req.user.id
      );

      await event.save();
      res.json({ message: "Registration cancelled" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
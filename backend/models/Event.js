const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  location: String,
  datetime: String,
  description: String,
  capacity: Number,
  category: String,
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Event", eventSchema);

require("dotenv").config(); // Load your .env variables
const mongoose = require("mongoose");
const Event = require("./models/Event"); // Import your Event model

// 1. Connect to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected for seeding"))
  .catch((err) => {
    console.error(" Connection error:", err);
    process.exit(1);
  });

// 2. Define Sample Data (Past and Future)
// CRITICAL: We use new Date() to ensure these are stored as Dates, not Strings.
const sampleEvents = [
  {
    name: "Past React Workshop",
    organizer: "Tech Daily",
    location: "Pune Convention Center",
    datetime: new Date("2025-01-15T10:00:00"), // PAST DATE
    description: "A deep dive into React hooks.",
    capacity: 100,
    category: "Technology",
    registeredUsers: []
  },
  {
    name: "Future AI Summit",
    organizer: "FutureTech",
    location: "Mumbai Hall",
    datetime: new Date("2026-12-20T09:00:00"), // FUTURE DATE
    description: "The future of AI agents.",
    capacity: 200,
    category: "AI",
    registeredUsers: []
  },
  {
    name: "Startup Mixer 2027",
    organizer: "Pune Founders",
    location: "WeWork",
    datetime: new Date("2027-05-05T18:00:00"), // FUTURE DATE
    description: "Networking for founders.",
    capacity: 50,
    category: "Business",
    registeredUsers: []
  }
];

// 3. Execution Function
const seedDB = async () => {
  try {
    // A. CLEAR existing data (removes the "String" date events)
    await Event.deleteMany({});
    console.log("  Old events removed.");

    // B. INSERT new data (adds "Date" object events)
    await Event.insertMany(sampleEvents);
    console.log(" New events added.");

    // C. Disconnect
    mongoose.connection.close();
    console.log(" Seeding complete. Connection closed.");
  } catch (err) {
    console.error(" Seeding error:", err);
    mongoose.connection.close();
  }
};

// Run the function
seedDB();
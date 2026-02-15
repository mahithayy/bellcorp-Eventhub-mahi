require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const Event = require("./models/Event"); // Import your Event model

// 1. Connect to the Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });

// 2. Define Sample Data (Past and Future)
// Note: We use new Date() to ensure they are stored as Date objects, not strings.
const sampleEvents = [
  {
    name: "React Workshop 2025",
    organizer: "Tech Daily",
    location: "Pune Convention Center",
    datetime: new Date("2025-01-15T10:00:00"), // PAST EVENT
    description: "A deep dive into React hooks and performance.",
    capacity: 100,
    category: "Technology",
    registeredUsers: []
  },
  {
    name: "AI Summit 2025",
    organizer: "FutureTech",
    location: "Mumbai Hall",
    datetime: new Date("2025-11-20T09:00:00"), // PAST EVENT
    description: "Discussing the future of AI agents.",
    capacity: 200,
    category: "AI",
    registeredUsers: []
  },
  {
    name: "Full Stack Bootcamp",
    organizer: "Coding Ninjas",
    location: "Bangalore",
    datetime: new Date("2026-12-10T10:00:00"), // FUTURE EVENT
    description: "Learn MERN stack from scratch.",
    capacity: 50,
    category: "Education",
    registeredUsers: []
  },
  {
    name: "Startup Mixer",
    organizer: "Pune Entrepreneurs",
    location: "WeWork Pune",
    datetime: new Date("2027-05-05T18:00:00"), // FUTURE EVENT
    description: "Networking for founders and investors.",
    capacity: 80,
    category: "Business",
    registeredUsers: []
  }
];

// 3. Execution Function
const seedDB = async () => {
  try {
    // A. CLEAR existing data to remove events with "String" dates
    await Event.deleteMany({});
    console.log("Old events removed.");

    // B. INSERT new data
    await Event.insertMany(sampleEvents);
    console.log("New events added.");

    // C. Disconnect
    mongoose.connection.close();
    console.log("Seeding complete. Connection closed.");
  } catch (err) {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  }
};

// Run the function
seedDB();
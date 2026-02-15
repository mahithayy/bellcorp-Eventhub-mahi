require("dotenv").config();
const connectDB = require("./config/db");
const Event = require("./models/Event");

connectDB();

const events = [
  // FUTURE EVENTS
  {
    name: "React Conference",
    organizer: "Tech World",
    location: "Mumbai",
    datetime: "2026-03-15",
    description: "Learn advanced React patterns and performance optimization.",
    capacity: 50,
    category: "Tech"
  },
  {
    name: "Startup Meetup",
    organizer: "Founders Hub",
    location: "Pune",
    datetime: "2026-04-10",
    description: "Networking for entrepreneurs and investors.",
    capacity: 30,
    category: "Business"
  },
  {
    name: "UI/UX Design Bootcamp",
    organizer: "DesignPro",
    location: "Bangalore",
    datetime: "2026-05-05",
    description: "Master Figma, UX research, and design systems.",
    capacity: 40,
    category: "Design"
  },

  // PAST EVENTS
  {
    name: "AI Summit 2024",
    organizer: "Future Tech",
    location: "Bangalore",
    datetime: "2024-11-20",
    description: "Breakthroughs in Generative AI and LLMs.",
    capacity: 100,
    category: "Tech"
  },
  {
    name: "Web Dev Workshop",
    organizer: "Code Academy",
    location: "Online",
    datetime: "2025-01-15",
    description: "Hands-on HTML, CSS & JavaScript training.",
    capacity: 20,
    category: "Education"
  },
  {
    name: "Digital Marketing Masterclass",
    organizer: "GrowthHackers",
    location: "Delhi",
    datetime: "2025-06-10",
    description: "SEO, performance marketing, and analytics.",
    capacity: 60,
    category: "Marketing"
  },
  {
    name: "Cloud Computing Bootcamp",
    organizer: "AWS UG",
    location: "Hyderabad",
    datetime: "2025-09-12",
    description: "Deep dive into AWS, containers, and DevOps.",
    capacity: 35,
    category: "Tech"
  }
];

(async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(events);
    console.log("🌱 Events seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

const users = [];

const events = [
  {
    id: "1",
    name: "React Conference",
    organizer: "Tech World",
    location: "Mumbai",
    datetime: "2026-03-15",
    description: "Join us for a deep dive into React Server Components and advanced patterns. Perfect for senior developers.",
    capacity: 50,
    category: "Tech",
    registeredUsers: []
  },
  {
    id: "2",
    name: "Startup Meetup",
    organizer: "Founders Hub",
    location: "Pune",
    datetime: "2026-04-10",
    description: "Networking for entrepreneurs and VCs. Pitch your ideas and find co-founders.",
    capacity: 30,
    category: "Business",
    registeredUsers: []
  },
  // NEW PAST EVENTS
  {
    id: "3",
    name: "AI Summit 2024",
    organizer: "Future Tech",
    location: "Bangalore",
    datetime: "2024-11-20",
    description: "A look back at the breakthroughs in Generative AI during 2024.",
    capacity: 100,
    category: "Tech",
    registeredUsers: []
  },
  {
    id: "4",
    name: "Web Dev Workshop",
    organizer: "Code Academy",
    location: "Online",
    datetime: "2025-01-15",
    description: "Hands-on session learning the basics of HTML, CSS, and JS.",
    capacity: 20,
    category: "Education",
    registeredUsers: []
  }
];

module.exports = { users, events };
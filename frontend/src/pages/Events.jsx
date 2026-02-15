import React, { useEffect, useState } from "react";
import API from "../api";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    date: ""
  });

  // Extract unique locations and categories for filter dropdowns
  const locations = [...new Set(events.map(e => e.location))];
  const categories = [...new Set(events.map(e => e.category))];

  const fetchEvents = async () => {
    // Build query string dynamically
    const params = new URLSearchParams(filters).toString();
    const res = await API.get(`/events?${params}`);

    // FILTER: Only show future events in Explore
    const upcomingEvents = res.data.filter(e => new Date(e.datetime) > new Date());
    setEvents(upcomingEvents);
  };

  // Debounce search or fetch on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search & Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="🔍 Search events..."
          className="border p-2 rounded w-full outline-indigo-500"
          value={filters.search}
          onChange={e => handleFilterChange("search", e.target.value)}
        />
        <select
          className="border p-2 rounded w-full bg-white outline-indigo-500"
          onChange={e => handleFilterChange("location", e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select
          className="border p-2 rounded w-full bg-white outline-indigo-500"
          onChange={e => handleFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="date"
          className="border p-2 rounded w-full outline-indigo-500"
          onChange={e => handleFilterChange("date", e.target.value)}
        />
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map(e => (
            <EventCard key={e._id} event={e} refresh={fetchEvents} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No upcoming events found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}

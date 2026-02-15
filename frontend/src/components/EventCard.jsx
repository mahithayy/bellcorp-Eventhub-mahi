import API from "../api";
import React from "react";

export default function EventCard({ event, refresh }) {
  const registeredCount = event.registeredUsers?.length || 0;
  const capacity = event.capacity || 0;
  const spotsLeft = capacity - registeredCount;
  const isFull = spotsLeft <= 0;

  // 1. Get User ID from Token to check registration status
  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    try {
      // Simple decode of JWT payload to get ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.id;
    } catch (e) {
      console.error("Invalid token");
    }
  }

  const isRegistered = event.registeredUsers?.includes(currentUserId);

  const register = async () => {
    try {
      await API.post(`/events/${event.id}/register`);
      refresh();
      alert("You are registered!");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full relative group">
      {/* Top Decorator */}
      <div className={`h-2 w-full ${isFull ? 'bg-gray-400' : 'bg-indigo-500'}`}></div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Header: Category & Date */}
        <div className="flex justify-between items-start mb-3">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase">
            {event.category}
          </span>
          <span className="text-gray-500 text-sm font-medium">
            {new Date(event.datetime).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">{event.name}</h2>
        <p className="text-sm text-indigo-600 font-medium mb-3">by {event.organizer}</p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="mr-1">📍</span> {event.location}
        </div>

        {/* Description - Explicitly ensuring this is rendered */}
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {event.description}
        </p>

        {/* Footer: Capacity & Button */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs">
            <span className="block text-gray-500">Availability</span>
            <span className={`font-bold ${isFull ? 'text-red-500' : 'text-green-600'}`}>
              {isFull ? "Sold Out" : `${spotsLeft} / ${capacity} seats`}
            </span>
          </div>

          <button
            onClick={register}
            // Disable if full OR if already registered
            disabled={isFull || isRegistered}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md
              ${(isFull || isRegistered)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' // Disabled style
                : 'bg-indigo-600 hover:bg-indigo-700 text-white' // Active style
              }`}
          >
            {/* Logic to change button text */}
            {isRegistered ? "Registered" : isFull ? "Full" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
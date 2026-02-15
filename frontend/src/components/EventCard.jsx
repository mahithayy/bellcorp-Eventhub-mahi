import API from "../api";
import React, { useState, useEffect } from "react";

export default function EventCard({ event, refresh }) { // REMOVED "async"
    const [userId, setUserId] = useState(null);
const [isExpanded, setIsExpanded] = useState(false);
    // Fetch current user ID once on mount
    useEffect(() => {
        API.get("/user/me")
            .then(res => setUserId(res.data._id))
            .catch(err => console.log("Not logged in"));
    }, []);
const isPast = new Date(event.datetime) < new Date();

    const registeredCount = event.registeredUsers?.length || 0;
    const capacity = event.capacity || 0;
    const spotsLeft = capacity - registeredCount;
    const isFull = spotsLeft <= 0;

    // Check if current user is in the list
    const isRegistered = userId && event.registeredUsers?.includes(userId);

    const register = async () => {
        if (!userId) {
            alert("Please login first");
            return;
        }
        try {
            await API.post(`/events/${event._id}/register`); // Ensure you use _id
            refresh();
            alert("You are registered!");
        } catch (err) {
            alert(err.response?.data?.message || "Error registering");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full relative group">
            <div className={`h-2 w-full ${isFull ? 'bg-gray-400' : 'bg-indigo-500'}`}></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded uppercase">
                        {event.category}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                        {new Date(event.datetime).toLocaleDateString()}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{event.name}</h2>
                <p className="text-sm text-indigo-600 font-medium mb-3">by {event.organizer}</p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>📍 {event.location}</span>
                </div>
                <div className={`text-gray-600 text-sm mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
        {event.description}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-indigo-600 text-xs font-semibold mb-4 hover:underline self-start"
      >
        {isExpanded ? "Show Less" : "View Description"}
      </button>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs">
                        <span className="block text-gray-500">Availability</span>
                        <span className={`font-bold ${isFull ? 'text-red-500' : 'text-green-600'}`}>
                            {isFull ? "Sold Out" : `${spotsLeft} / ${capacity} seats`}
                        </span>
                    </div>
                    <button
                        onClick={register}
                        disabled={isFull || isRegistered || isPast}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md ${
                            (isFull || isRegistered || isPast)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                    >
                        {isPast ? "Event Ended" : isRegistered ? "Registered" : isFull ? "Full" : "Register"}
                    </button>
                </div>
            </div>
        </div>
    );
}
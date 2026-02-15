import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState({ registered: [], upcoming: [], past: [] });

  const fetchData = () => {
    API.get("/user/dashboard").then(res => setData(res.data)).catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCancel = async (id) => {
    if(!window.confirm("Are you sure you want to cancel your registration?")) return;
    try {
      await API.post(`/events/${id}/cancel`);
      alert("Registration cancelled");
      fetchData(); // Refresh list
    } catch (err) {
      alert("Error cancelling");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-500">Manage your events and view history</p>
      </header>

      {/* 1. Upcoming: Future events only.
          2. Registered: ALL events (past + future).
             - Logic inside Section ensures past events in this list don't show "Cancel".
          3. Past History: Past events only (grayed out).
      */}
      <Section title="📅 Upcoming Events" events={data.upcoming} onCancel={handleCancel} />

      <Section title="✓ Registered Events (All)" events={data.registered} onCancel={handleCancel} />

      <Section title="📜 Past History" events={data.past} gray />
    </div>
  );
}

// Reusable Section Component
function Section({ title, events, gray, onCancel }) {
  if (!events || events.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        {title}
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
          {events.length}
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(e => {
          // Check date individually for every event card
          const isPast = new Date(e.datetime) < new Date();

          return (
            <div
              key={e._id}
              className={`p-5 rounded-xl border flex flex-col transition-all
                ${(gray || isPast)
                  ? 'bg-gray-50 border-gray-200 opacity-75'
                  : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{e.name}</h3>
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600 whitespace-nowrap">
                  {new Date(e.datetime).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-1">{e.location}</p>
              <p className="text-gray-500 text-xs mb-4">By {e.organizer}</p>

              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                {isPast ? (
                  // If event is past, show Completed (No Cancel Button)
                  <span className="text-sm text-gray-500 font-medium italic">
                    Completed
                  </span>
                ) : (
                  // If event is future, show Cancel Button (unless the section specifically forbids it, but here we assume 'gray' section also implies no interaction)
                  <button
                    onClick={() => onCancel(e._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Cancel Registration
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
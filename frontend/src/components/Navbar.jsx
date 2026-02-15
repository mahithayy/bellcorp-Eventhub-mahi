import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import API from "../api"; // Ensure you import your API instance

export default async function Navbar() {
  const navigate = useNavigate();
   try {
    const isAuthenticated = await API.get("/user/me");
    const token = isAuthenticated.data.token;
    if (token) config.headers.Authorization = token;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
  const [userName, setUserName] = useState(""); // State to hold the name

  // Fetch the user name from MongoDB when the component loads
  useEffect(() => {
    if (token) {
      API.get("/user/me")
        .then((res) => {
          setUserName(res.data.name); // Set the name from the DB response
        })
        .catch(() => {
          // If token is invalid (e.g., expired), logout user
          handleLogout();
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(""); // Clear state
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left Side: Logo */}
        <div className="flex flex-col">
          <Link to={token ? "/" : "/login"}>
            <h1 className="text-2xl font-bold tracking-tight">Mahitha's EventHub</h1>
          </Link>
        </div>

        {/* Right Side: Navigation */}
        <div className="flex items-center space-x-6 font-medium">
          {token ? (
            <>
              {/* Display the Name from MongoDB */}
              {userName && (
                <span className="text-indigo-200">
                  Welcome, <span className="text-white font-bold">{userName}</span>
                </span>
              )}

              <Link to="/" className="hover:text-indigo-200">Explore</Link>
              <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>

              <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white text-indigo-100">Login</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-50">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
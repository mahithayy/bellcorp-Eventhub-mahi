import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex flex-col">
          <Link to={token ? "/" : "/login"}>
             <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Mahitha's EventHub
            </h1>
          </Link>
          <span className="text-xs text-indigo-200 opacity-80 font-medium tracking-wide">
            BellCorp project by Mahitha
          </span>
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex items-center space-x-6 font-medium">

          {token ? (
            /* SHOW THESE IF LOGGED IN */
            <>
              <Link to="/" className="hover:text-indigo-200 transition-colors duration-200">
                Explore Events
              </Link>
              <Link to="/dashboard" className="hover:text-indigo-200 transition-colors duration-200">
                My Dashboard
              </Link>
              <div className="h-6 w-px bg-indigo-400/50 mx-2"></div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            /* SHOW THESE IF LOGGED OUT */
            <>
              <Link to="/login" className="hover:text-white text-indigo-100 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
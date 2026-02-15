import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import API from "../api";

export default function Navbar() { // REMOVED "async"
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    // Fetch user info when component mounts
    useEffect(() => {
        API.get("/user/me")
            .then((res) => {
                setUserName(res.data.name);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);
useEffect(() => {
  const fetchUser = () => {
    API.get("/user/me")
      .then(res => {
        setUserName(res.data.name);
        setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  };

  fetchUser();
  window.addEventListener("authChanged", fetchUser);
  return () => window.removeEventListener("authChanged", fetchUser);
}, []);

    const handleLogout = async () => {
  try {
    await API.post("/auth/logout"); // Call the new backend endpoint
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  } catch (e) {
    console.error("Logout failed", e);
  }
};

    return (
        <nav className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <Link to={isLoggedIn ? "/" : "/login"}>
                        <h1 className="text-2xl font-bold tracking-tight">Mahitha's EventHub</h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-6 font-medium">
                    {isLoggedIn ? (
                        <>
                            <span className="text-indigo-200">
                                Welcome, <span className="text-white font-bold">{userName}</span>
                            </span>
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
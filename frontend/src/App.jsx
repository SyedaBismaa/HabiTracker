import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Auth sync on app load
  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await axios.get(
          "https://habitracker-y4i5.onrender.com/auth/me",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, []);

  const logout = async () => {
    await axios.post(
      "https://habitracker-y4i5.onrender.com/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return null;

  return (
    <div className="flex">
      <Sidebar user={user} logout={logout} />

      <div className="flex-1 ml-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth-success" element={<OAuthSuccess setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

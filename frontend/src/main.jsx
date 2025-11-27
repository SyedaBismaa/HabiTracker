import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Journals from "./pages/Journals";
import JournalDetails from "./pages/JournalDetails";
import LeaderBoard from "./pages/LeaderBoard";
import Todo from "./pages/Todo";
import HabitPage from "./pages/HabitPage";
import Posts from "./pages/Posts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicProfile from "./pages/PublicProfile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    {/* ToastContainer must be HERE */}
    <ToastContainer position="top-right" theme="dark" />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:username" element={<PublicProfile/>} />
      <Route path="/journals" element={<Journals />} />
      <Route path="/journals/:id" element={<JournalDetails />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/habits" element={<HabitPage />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  </BrowserRouter>
);

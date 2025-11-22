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

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
        <Route path="/journals" element={<Journals />} />
          <Route path="/journals/:id" element={<JournalDetails />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
    </Routes>
  </BrowserRouter>
);

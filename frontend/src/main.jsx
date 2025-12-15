import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// 🔹 Lazy loaded pages
const App = lazy(() => import("./App"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const Journals = lazy(() => import("./pages/Journals"));
const JournalDetails = lazy(() => import("./pages/JournalDetails"));
const LeaderBoard = lazy(() => import("./pages/LeaderBoard"));
const Todo = lazy(() => import("./pages/Todo"));
const HabitPage = lazy(() => import("./pages/HabitPage"));
const Posts = lazy(() => import("./pages/Posts"));
const OAuthSuccess = lazy(() => import("./pages/OAuthSuccess"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const NotFound = lazy(() => import("./pages/NotFound")); 

// 🔹 Loading fallback
const Loader = () => (
  <div className="min-h-[100dvh] flex items-center justify-center text-white">
    Loading…
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer position="top-right" theme="dark" />

    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/journals/:id" element={<JournalDetails />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/chat" element={<ChatPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Token is now stored in cookie — just fetch user
    axios
      .get("http://localhost:3000/auth/me", { withCredentials: true })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate(`/profile/${res.data.user.username}`);
      })
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Logging you in...
    </div>
  );
}

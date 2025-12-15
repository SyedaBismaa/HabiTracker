import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Cookie already set → just verify user
        await axios.get(
          "https://habitracker-y4i5.onrender.com/auth/me",
          { withCredentials: true }
        );

        // ✅ Auth confirmed
        navigate("/");
      } catch (err) {
        console.log("OAuth verify failed:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Signing you in with Google…
    </div>
  );
};

export default OAuthSuccess;

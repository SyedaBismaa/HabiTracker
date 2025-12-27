import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

        // Update streak on OAuth login
        try {
          await axios.post(
            "https://habitracker-y4i5.onrender.com/streak/update",
            {},
            { withCredentials: true }
          );
          toast.success("🔥+1", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (streakErr) {
          console.log("Streak update failed:", streakErr);
        }

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
    <div className="min-h-[100dvh] flex items-center justify-center text-white">
      Signing you in with Google…
    </div>
  );
};

export default OAuthSuccess;

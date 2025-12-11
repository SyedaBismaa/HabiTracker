import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });

        console.log("OAuth user:", res.data.user);

        // ⭐ IMPORTANT: Save fresh user (WITH NEW AVATAR)
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/");
      } catch (err) {
        console.log("OAuth fetch error:", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-white p-10">Signing you in...</div>
  );
};

export default OAuthSuccess;

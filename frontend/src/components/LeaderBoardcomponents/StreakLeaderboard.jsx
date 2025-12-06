import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StreakLeaderboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/leaderboard?type=streak", {
        withCredentials: true,
      })
      .then((res) => setData(res.data.leaderboard))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="space-y-3 w-full">
      {data.map((user, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl 
          flex items-center justify-between flex-wrap gap-3"
        >
          {/* CLICK AREA */}
          <div
            className="flex items-center gap-3 min-w-[180px] cursor-pointer"
              onClick={() =>  navigate(`/profile/${user.username}`)}
          >
            <span className="text-xl font-bold">
              {index + 1 === 1 ? "🔥1" : index + 1 === 2 ? "🔥2" : index + 1 === 3 ? "🔥3" : index + 1}
            </span>

            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-medium text-sm sm:text-base">
              {user.username}
            </span>
          </div>

          {/* STREAK */}
          <span className="font-semibold text-orange-600 text-sm sm:text-base">
            {user.streak} days
          </span>
        </div>
      ))}
    </div>
  );
};

export default StreakLeaderboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LikesLeaderboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://habitracker-y4i5.onrender.com/leaderboard?type=likes", {
        withCredentials: true,
      })
      .then((res) => setData(res.data.leaderboard))
      .catch(console.log);
  }, []);

  return (
    <div className="space-y-3 w-full">
      {data.map((user, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-700 p-4 rounded-xl 
          flex items-center justify-between flex-wrap gap-3 text-white"
        >
          <div
            className="flex items-center gap-3 min-w-[180px] cursor-pointer"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            <span className="text-xl font-bold">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
            </span>

            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-medium">
              {user.username}
            </span>
          </div>

          <span className="font-semibold text-blue-400">
            {user.totalLikes} likes
          </span>
        </div>
      ))}
    </div>
  );
};

export default LikesLeaderboard;

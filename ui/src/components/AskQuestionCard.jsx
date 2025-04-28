import { useEffect, useState } from "react";
import morningSky from "../assets/morning-sky.jpg";
import nightSky from "../assets/night-sky.jpg";
import { useNavigate } from "react-router";

export const AskQuestionCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const hour = currentTime.getHours();
  const isDayTime = hour >= 6 && hour < 18;
  const backgroundImage = isDayTime ? morningSky : nightSky;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAskQuestionClick = () => {
    navigate("/create-question");
  };

  return (
    <div
      className="bg-slate-600 shadow-md rounded-2xl p-4 w-172 mb-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-sm font-semibold md-1 text-white">
        {formattedTime}
      </div>
      <p className="text-xl font-semibold md-1 text-white">Ask Anything...</p>
      <p
        onClick={handleAskQuestionClick}
        className="bg-white p-2 pl-3 mt-2 rounded-lg text-[#64748b] font-semibold cursor-pointer"
      >
        Create a post...
      </p>
    </div>
  );
};

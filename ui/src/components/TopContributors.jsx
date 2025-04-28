import { useEffect, useState } from "react";
import { fetchTopContributors } from "../api";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../store/currentUserAtom";
import { useNavigate } from "react-router";

export const TopContributors = () => {
  const [topContributors, setTopContributors] = useState([]);
  const currentUser = useRecoilValue(currentUserAtom)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTopContributors();
      setTopContributors(res);
    };
    fetchData();
  }, []);

  if (topContributors.length === 0) {
    <div className="bg-white shadow-md rounded-2xl p-8 w-66">Loading...</div>;
  }

  const handleProfileClick = (userId) => {
    if (userId === currentUser.userId) {
      navigate("/my-profile");
      return;
    }
    navigate(`/profile/${userId}`);
  };
  
  if(topContributors.length === 0){
    return(
      <div className="bg-white shadow-md rounded-2xl p-8 w-66 items-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 w-66 items-center">
      <center>
        <p className="mb-2 font-semibold">Top Contributors</p>
      </center>
      {topContributors.map((user) => (
        <div
          key={user.userId}
          className="cursor-pointer p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 mb-1 flex items-center gap-3"
          onClick={() => handleProfileClick(user.userId)}
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="w-7 h-7 rounded-full border border-gray-300"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{user.username}</p>
            <div className="flex text-xs text-gray-500 justify-between">
              <p>Questions: {user.questions.length}</p>
              <p>Answers: {user.answers.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

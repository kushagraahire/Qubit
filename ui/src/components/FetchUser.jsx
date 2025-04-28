import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../store/currentUserAtom";

export const FetchUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/qubit/user/current-user`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
            console.log(response.data)
          setCurrentUser(response.data);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          navigate("/login");
        }
        console.error("Error:", error.response?.data || error.message);
        toast.error("Failed to fetch user data.");
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, [authToken, currentUser, navigate, setCurrentUser]);

  return (
    <div>
      {currentUser ? (
        <img className="h-9 w-9" src={currentUser.avatar} alt="User Avatar" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

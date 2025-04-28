import React, { useState } from "react";
import logo from "../assets/qubit-logo-svg.svg";
import { useNavigate } from "react-router";
import { FetchUser } from "./FetchUser";
import { QuestionSearchBar } from "./QuestionSearchBar";
import { searchQueryState } from "../store/searchQueryAtom";
import { selectedTagState } from "../store/tagsAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { questionsAtom } from "../store/questionsAtom";
import { isLoadingAtom } from "../store/loadingAtom";
import { fetchAllQuestions } from "../api";

export const AppBar = () => {
  const navigate = useNavigate();
  const setQuestions = useSetRecoilState(questionsAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const setSelectedTag = useSetRecoilState(selectedTagState);
  const [showMenu, setShowMenu] = useState(false);

  const handleUser = () => {
    // Navigate to user profile
    navigate("/my-profile");
    setShowMenu(false);
  };

  const handleLogout = () => {
    // Empty logout method
    setShowMenu(false);
    localStorage.setItem("authToken", "")
    navigate('/login')
  };

  const handleHomeClick = async () => {
    // Reset all filters
    setSearchQuery("");
    setSelectedTag(null);

    // Fetch all questions (reset to default state)
    setIsLoading(true);
    const data = await fetchAllQuestions();
    setQuestions(data);
    setIsLoading(false);

    // Navigate to home page
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="flex justify-between bg-white px-12 py-3 drop-shadow-lg">
      <img
        className="cursor-pointer h-9"
        onClick={handleHomeClick}
        src={logo}
        alt="Logo"
      />
      <QuestionSearchBar />
      <div className="relative">
        <div onClick={toggleMenu} className="cursor-pointer">
          <FetchUser />
        </div>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded">
            <div
              onClick={handleUser}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Profile
            </div>
            <div
              onClick={handleLogout}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

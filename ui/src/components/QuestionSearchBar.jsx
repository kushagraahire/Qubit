import { useRecoilState, useSetRecoilState } from "recoil";
import searchIcon from "../assets/icons/search-icon.svg";
import { searchQueryState } from "../store/searchQueryAtom";
import { useState } from "react";
import { selectedTagState } from "../store/tagsAtom";
import { questionsAtom } from "../store/questionsAtom";
import { isLoadingAtom } from "../store/loadingAtom";
import { fetchQuestionsByTitle } from "../api";
export const QuestionSearchBar = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [inputValue, setInputValue] = useState(searchQuery);
  const setSelectedTag = useSetRecoilState(selectedTagState);
  const setQuestions = useSetRecoilState(questionsAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setIsLoading(true);

    setSelectedTag(null);

    setSearchQuery(inputValue);

    const data = await fetchQuestionsByTitle(inputValue);
    setQuestions(data)

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };


  return (
    <div className="relative flex items-center">
      <input
        name="question-search"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="font-mono pl-10 w-92 h-full bg-slate-100 rounded-lg border border-slate-100 focus:outline-1 focus:outline-slate-400 focus:bg-white"
      />
      <img className="absolute left-2 h-5" src={searchIcon} alt="Search" />
    </div>
  );
};

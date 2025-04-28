import { useEffect } from "react";
import tagIcon from "../assets/icons/tag-icon.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTagState, tagListAtom } from "../store/tagsAtom";
import axios from "axios";
import { fetchAllQuestions, fetchAllTags, fetchQuestionsByTag } from "../api";
import { searchQueryState } from "../store/searchQueryAtom";
import { questionsAtom } from "../store/questionsAtom";
import { isLoadingAtom } from "../store/loadingAtom";

export const TagList = () => {
  const [tagList, setTagList] = useRecoilState(tagListAtom);
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const setQeustions = useSetRecoilState(questionsAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const handleTagClick = async (tagId) => {
    setIsLoading(true);
    setSearchQuery("");

    if (tagId === null) {
      const data = await fetchAllQuestions();
      setQeustions(data);
      setSelectedTag(null);
    } else {
      const data = await fetchQuestionsByTag(tagId);
      if (data.length <= 0) {
        setTagList((prevTagList) =>
          prevTagList.filter((tag) => tag.tagId !== tagId)
        );
        const allQuestions = await fetchAllQuestions();
        setQeustions(allQuestions);
        setSelectedTag(null);
      } else {
        setQeustions(data);
      }
    }
    setSelectedTag(tagId);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchTagList = async () => {
      const res = await fetchAllTags();

      if (res.status === 200) {
        setTagList(res.data);
        console.log(res.data);
      } else {
        console.log("Error fetching tag list");
      }
    };

    if (!tagList || tagList.length <= 0) {
      fetchTagList();
    }
  }, [setTagList]);

  if (!tagList) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-8 w-66 h-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 w-66">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={tagIcon}
          alt="Tag Icon"
          style={{ width: "24px", height: "24px" }}
        />
        <p className="text-md font-semibold text-[#94a3b8] ml-2">TAGS</p>
      </div>
      <div className="mt-3 ml-2 border-l-2 border-[#cbd5e1]">
        {tagList.map((tag) => {
          return (
            <div
              className={`ml-6 mt-2 text-[#334155] cursor-pointer ${
                selectedTag === tag.tagId ? "font-bold" : "font-normal"
              }`}
              key={tag.tagId}
              onClick={() => handleTagClick(tag.tagId)}
            >
              {tag.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { useRecoilState, useRecoilValue } from "recoil";
import { questionsAtom } from "../store/questionsAtom";
import { isLoadingAtom } from "../store/loadingAtom";
import { QuestionCard } from "./QuestionCard";
import { fetchAllQuestions } from "../api";
import { useEffect } from "react";

export const QuestionList = () => {
  const [questions, setQuestions] = useRecoilState(questionsAtom)
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom)

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
    if (questions.length === 0) {
      const data = await fetchAllQuestions();
      setQuestions(data);
    }
    setIsLoading(false)
    };
    
    loadPosts();
  }, [setQuestions]);


  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-8 w-172">
        <div className="loading">Loading questions...</div>
      </div>
    );
  }

  if(questions.length === 0){
    return (
      <div className="bg-white shadow-md rounded-2xl p-8 w-172">
        <div className="loading">Questions Not Found</div>
      </div>
    );
  }

  return <div className="bg-white shadow-md rounded-2xl p-8 w-172">
    {questions.map((question) => {
      return(<QuestionCard question={question} key={question.questionId}/>)
    })}
  </div>;
};

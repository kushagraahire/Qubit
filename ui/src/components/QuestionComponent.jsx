import { useNavigate, useParams } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { questionsAtom, questionSelector } from "../store/questionsAtom";
import { useEffect, useState } from "react";
import { addAnswer, getQuestion } from "../api";
import answerIcon from "../assets/icons/answer-icon.svg";
import { currentUserAtom } from "../store/currentUserAtom";
import upArrowIcon from "../assets/icons/up-arrow-icon.svg";
import { toast, ToastContainer } from "react-toastify";
import { AnswerComponent } from "./AnswerComponent";

export const QuestionComponent = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(
    useRecoilValue(questionSelector(questionId))
  );
  const setQuestions = useSetRecoilState(questionsAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (question) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [question]);

  useEffect(() => {
    const fetchQuestion = async (questionId) => {
      return getQuestion(questionId);
    };

    if (!question) {
      const loadQuestion = async () => {
        const data = await fetchQuestion(questionId);
        setQuestion(data);
      };

      loadQuestion();
    }
  }, [questionId, question, setQuestion]);

  if (!question) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, ...updatedQuestion } : q
      )
    );
  };

  const handleAddAnswer = async () => {
    if (!answer || answer.length <= 0) {
      return;
    }
    const answerRequest = {
      content: answer,
      questionId: question.questionId,
      userId: currentUser.userId,
      upVotes: 0,
    };

    const res = await addAnswer(answerRequest);

    if (res) {
      const updatedQuestion = {
        ...question,
        answers: [...question.answers, res],
      };
      setQuestion(updatedQuestion);

      const updatedCurrentUser = {
        ...currentUser,
        answers: [...currentUser.answers, res],
      };
      setCurrentUser(updatedCurrentUser);

      console.log("question : " + question);
      handleUpdateQuestion(question);
      setAnswer("");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleProfileClick = (userId) => {
    if (userId === currentUser.userId) {
      navigate("/my-profile");
      return;
    }
    navigate(`/profile/${userId}`);
  };

  const formatTextWithCodeBlocks = (text) => {
    if (!text) return [];
    const parts = text.split("```");
    return parts.map((part, index) => ({
      type: index % 2 === 0 ? "text" : "code",
      content: part,
    }));
  };

  const formattedDescription = formatTextWithCodeBlocks(question.description);
  
  return (
    <div className="flex justify-center my-8">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl w-full">
        {/* User Info (Avatar + Name) */}
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={question.author.avatar}
            alt="https://ui-avatars.com/api/?name=User+Name"
          />
          <div className="ml-3">
            <p
              className="cursor-pointer font-medium text-[#334155] hover:underline"
              onClick={() => handleProfileClick(question.author.userId)}
            >
              {question.author.username}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Updated{" "}
              {new Date(question.updatedDateTime).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {/* Question Title */}
        <p className="text-lg font-medium mt-4">{question.title}</p>

        {/* Question Description */}
        <p className="mt-2 text-[#475569] text-justify">
          {formattedDescription.map((part, index) => {
            if (part.type === "text") {
              return (
                <span key={index} style={{ whiteSpace: "pre-line" }}>
                  {part.content}
                </span>
              );
            } else {
              return (
                <pre
                  key={index}
                  className="bg-gray-800 text-gray-100 text-sm p-4 rounded-md my-2 overflow-x-auto shadow"
                >
                  <code>{part.content}</code>
                </pre>
              );
            }
          })}
        </p>

        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {question.tags.map((tag, tagId) => (
              <span
                key={tagId}
                className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Answer Count */}
        <div className="flex items-center mb-1 mt-4">
          <img className="h-6 w-6" src={answerIcon} alt="alt" />
          <p className="ml-1 text-[#475569] text-sm">
            {question.answers.length}
          </p>
        </div>

        {/* Add Answer Section */}

        <div className="flex mt-8">
          <img
            className="h-8 w-8 rounded-full"
            src={currentUser.avatar}
            alt="https://ui-avatars.com/api/?name=User+Name"
          />
          <textarea
            className="ml-4 w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
            type="text"
            placeholder="Add an answer...
(use ``` to wrap code sections)"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
        </div>

        <div className="flex justify-end">
          <img
            src={upArrowIcon}
            className="h-10 w-10 mt-2 mr-4 cursor-pointer rounded-full hover:bg-gray-300 "
            onClick={handleAddAnswer}
          />
        </div>

        {/* Top Answer Section */}
        {question.answers && question.answers.length > 0 && (
          <div>
            {question.answers.map((answer) => (
              <AnswerComponent
                key={answer.answerId}
                answer={answer}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setQuestions={setQuestions}
                setQuestion={setQuestion}
              />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

import { act, useEffect, useState } from "react";
import likeIcon from "../assets/icons/like-icon.svg";
import filledLikeIcon from "../assets/icons/like-icon-filled.svg";
import { fetchCurrentUser, updateAnswer, updateUpvotes } from "../api";
import { useNavigate } from "react-router";

export const AnswerComponent = ({
  answer,
  currentUser,
  setCurrentUser,
  setQuestions,
  setQuestion,
}) => {
  const [upvotes, setUpvotes] = useState(answer.upVotes);
  const [upvotesToggle, setUpvotesToggle] = useState(
    currentUser.upvoteAnswers.includes(answer.answerId)
  );
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setUpvotes(answer.upVotes)
  //     const isUpvoted = currentUser.upvoteAnswers.includes(answer.answerId)
  //     setUpvotesToggle(isUpvoted)
  //   }, []);

  const handleProfileClick = (userId) => {
    if (userId === currentUser.userId) {
      navigate("/my-profile");
      return;
    }
    navigate(`/profile/${userId}`);
  };

  const handleUpvoteClick = async () => {
    const newUpvotesToggle = !upvotesToggle;
    const newUpvotes = newUpvotesToggle ? upvotes + 1 : upvotes - 1;
    const upvoteAction = newUpvotesToggle ? "INCREMENT" : "DECREMENT";

    setUpvotesToggle(newUpvotesToggle);
    setUpvotes(newUpvotes);

    let updateUpvoteRequest = {
      userId: currentUser.userId,
      answerId: answer.answerId,
      action: upvoteAction,
    };

    const res = await updateUpvotes(updateUpvoteRequest);
    if (res) {
      setCurrentUser((prev) => {
        const alreadyUpvoted = prev.upvoteAnswers.includes(answer.answerId);
        return {
          ...prev,
          upvoteAnswers: alreadyUpvoted
            ? prev.upvoteAnswers.filter((id) => id !== answer.answerId)
            : [...prev.upvoteAnswers, answer.answerId],
        };
      });

      setQuestions((prev) =>
        prev.map((q) =>
          q.questionId === answer.questionId
            ? {
                ...q,
                answers: q.answers.map((ans) =>
                  ans.answerId === answer.answerId
                    ? { ...ans, upVotes: newUpvotes }
                    : ans
                ),
              }
            : q
        )
      );
    }
  };

  const formatTextWithCodeBlocks = (text) => {
    if (!text) return [];
    const parts = text.split("```");
    return parts.map((part, index) => ({
      type: index % 2 === 0 ? "text" : "code",
      content: part,
    }));
  };

  const formattedAnswer = formatTextWithCodeBlocks(answer.content);

  if (!answer) {
    return <div className="mb-4">Loading answer...</div>;
  }

  return (
    <div className="mb-4 w-full">
      <div className="flex justify-between mt-6 mr-6 items-start">
        <div className="flex items-start w-full">
          <img
            className="h-8 w-8 rounded-full"
            src={answer.author.avatar}
            alt="https://ui-avatars.com/api/?name=User+Name"
          />
          <div className="ml-3 w-full pr-4">
            <p
              className="cursor-pointer text-base text-[#334155] hover:underline"
              onClick={() => handleProfileClick(answer.author.userId)}
            >
              {answer.author.username}
            </p>
            <p className="text-xs text-gray-500">
              Updated{" "}
              {new Date(answer.updatedDateTime).toLocaleString("en-US", {
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
            <p className="mt-2 text-[#475569] text-justify w-ful">
              {formattedAnswer.map((part, index) => {
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
          </div>
        </div>
        <div
          className="cursor-pointer items-center pt-2 flex hover:opacity-80 hover:scale-105 transition duration-200"
          onClick={handleUpvoteClick}
        >
          <img
            src={upvotesToggle ? filledLikeIcon : likeIcon}
            className="h-5 w-5"
          />
          <p className="ml-1 text-[#64748b]">{upvotes}</p>
        </div>
      </div>
    </div>
  );
};

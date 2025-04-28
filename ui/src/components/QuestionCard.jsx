import { useNavigate } from "react-router";
import answerIcon from "../assets/icons/answer-icon.svg";

export const QuestionCard = ({ question }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex cursor-pointer" onClick={() => navigate(`/question/${question.questionId}`)}>
        <img
          className="h-10 w-10 rounded-full"
          src={question.author.avatar}
          alt="https://ui-avatars.com/api/?name=User+Name"
        />
        <div className="ml-3 mb-4">
          <p className="font-medium text-[#334155]">
            {question.author.username}
          </p>
          <p className="text-xs text-gray-500">
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
          <p className="text-lg font-medium mt-2">{question.title}</p>
          <p className="line-clamp-4 mt-2 text-[#475569] text-justify">
            {question.description}
          </p>
          <div className="flex items-center mb-1 mt-4">
            <img className="h-6 w-6" src={answerIcon} alt="alt" />
            <p className="ml-1 text-[#475569] text-sm">
              {question.answers.length}
            </p>
          </div>
          {question.answers && question.answers.length !== 0 && (
            <div className="bg-[#f1f5f9] py-2 px-3 mt-4 rounded-md">
              <p className="font-semibold text-[#475569]">Top Answer</p>
              <div className="flex mt-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={question.answers[0].author.avatar}
                  alt="https://ui-avatars.com/api/?name=User+Name"
                />
                <p className="line-clamp-2 mt-1 ml-2 text-[#475569]">
                  {question.answers[0].content}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-gray-300 mb-6"></div>
    </div>
  );
};

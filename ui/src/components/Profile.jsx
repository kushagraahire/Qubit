import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchUserProfile } from "../api";

export const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("questions");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await fetchUserProfile(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if(!user){
    return(
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden my-8 p-8">
            Loading
        </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden my-8 p-8">
      {/* Profile Header */}
      <div className="flex items-center border-b border-gray-200 pb-6">
        <img
          className="h-24 w-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
          src={user.avatar}
          alt={user.username}
        />
        <div className="ml-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {user.username}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex mt-4 space-x-8">
            <div className="text-center">
              <span className="block text-2xl font-semibold text-gray-800">
                {user.questions?.length || 0}
              </span>
              <span className="text-sm text-gray-500">Questions</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-semibold text-gray-800">
                {user.answers?.length || 0}
              </span>
              <span className="text-sm text-gray-500">Answers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-2 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelected("questions")}
            className={`py-2 text-lg font-medium transition-colors ${
              selected === "questions"
                ? "border-b-2 border-[#883cb4] text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setSelected("answers")}
            className={`py-2 text-lg font-medium transition-colors ${
              selected === "answers"
                ? "border-b-2 border-[#883cb4] text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Answers
          </button>
        </nav>
      </div>

      {/* Content Section */}
      <div className="mt-6">
        {selected === "questions" && (
          <div className="space-y-6">
            {user.questions?.length > 0 ? (
              user.questions.map((question) => (
                <div
                  key={question.questionId}
                  className="max-w-3xl mx-auto p-6 border border-gray-200 rounded-xl shadow-sm bg-white transition transform hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <h3
                        className="cursor-pointer text-xl font-semibold text-gray-800 line-clamp-4"
                        onClick={() =>
                          navigate(`/question/${question.questionId}`)
                        }
                      >
                        {question.title}
                      </h3>
                      <p
                        className="cursor-pointer text-gray-600 mt-2 text-justify line-clamp-4"
                        onClick={() =>
                          navigate(`/question/${question.questionId}`)
                        }
                      >
                        {question.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Updated:{" "}
                        {new Date(question.updatedDateTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No questions asked yet.</p>
            )}
          </div>
        )}
        {selected === "answers" && (
          <div className="space-y-6">
            {user.answers?.length > 0 ? (
              user.answers.map((answer) => (
                <div
                  key={answer.id}
                  className="cursor-pointer max-w-3xl mx-auto p-6 border border-gray-200 rounded-xl shadow-sm bg-white transition transform hover:shadow-md hover:scale-[1.02]"
                  onClick={() => navigate(`/question/${answer.questionId}`)}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-4">
                        {answer.content}
                      </h3>
                      <p className="text-gray-700 mt-2 line-clamp-4">
                        Question: {answer.questionTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Upvotes: {answer.upVotes} | Updated:{" "}
                        {new Date(answer.updatedDateTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No answers posted yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

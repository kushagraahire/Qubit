import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { questionsAtom, questionSelector } from "../store/questionsAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getQuestion, updateQuestion } from "../api";
import { currentUserAtom } from "../store/currentUserAtom";

export const EditQuestion = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(
    useRecoilValue(questionSelector(questionId))
  );
  const setQuestions = useSetRecoilState(questionsAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let tags = [];
    if (data.tags != null) {
      tags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    const updateQuestionRequest = {
      title: data.title,
      description: data.description,
      tags,
      userId: currentUser.userId,
    };
    const handleUpdateQuestion = (updatedQuestion) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, ...updatedQuestion } : q
        )
      );
    };

    const res = await updateQuestion(
      question.questionId,
      updateQuestionRequest
    );

    if (res) {
      const updatedQuestion = {
        ...question,
        ...res,
      };
      handleUpdateQuestion(question)
      toast.success("Question updated successfully")
      navigate(-1)
      setQuestion(updatedQuestion);
    }else{
        toast.error("Something went wrong")
    }
  };

  const getTags = () => {
    if (question.tags != null || question.tags.length != 0) {
      return question.tags.map((tag) => tag.name).join(", ");
    }
    return "";
  };

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

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100 my-10">
      <div className="bg-white shadow-lg rounded-2xl p-12 w-172">
        <div className="mb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Title</label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
                type="text"
                {...register("title", { required: true })}
                defaultValue={question.title}
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  Title is required
                </span>
              )}

              <label className="font-medium text-gray-700 mt-4">
                Description
              </label>
              <textarea
                className="h-72 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
                type="text"
                {...register("description", { required: true })}
                defaultValue={question.description}
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">
                  Description is required
                </span>
              )}

              <label className="font-medium text-gray-700 mt-4">Tags</label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
                type="text"
                {...register("tags")}
                defaultValue={getTags()}
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-[#883cb4] text-white py-2 mt-4 rounded-lg w-full font-semibold hover:bg-[#6c3090] transition duration-200"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

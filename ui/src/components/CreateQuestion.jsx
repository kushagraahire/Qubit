import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../store/currentUserAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { createQuestion } from "../api";
import { toast, ToastContainer } from "react-toastify";

export const CreateQuestion = () => {
  const currentUser = useRecoilValue(currentUserAtom);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!currentUser || !currentUser.userId) {
      toast.error("User information is missing. Please log in again.");
      return;
    }
    let tags = [];
    if (data.tags != null) {
      tags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }
    const createQuestionRequest = {
      title: data.title,
      description: data.description,
      tags,
      userId: currentUser.userId,
    };
    const res = await createQuestion(createQuestionRequest);
    if (!res) {
      toast.error("Unable to create question");
      return;
    }
    toast.success("Question Created!");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100 my-10">
      <div className="bg-white shadow-lg rounded-2xl p-12 w-172">
        <center>
          <p className="text-lg font-bold mb-6 text-[#883cb4]">
            CREATE A QUESTION
          </p>
        </center>
        <div className="mb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Title</label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  Title is required
                </span>
              )}

              <label className="font-medium text-gray-700 mt-4">
                Description{" "}
                <span className="text-gray-500 font-normal">
                  (use ``` to wrap code sections)
                </span>
              </label>
              <textarea
                className="h-72 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
                type="text"
                {...register("description", { required: true })}
                placeholder="You can add code by wrapping it in triple backticks like this:
 ```
 console.log('Hello world');
 ```
Continue with regular text here.."
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
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-[#883cb4] text-white py-2 mt-4 rounded-lg w-full font-semibold hover:bg-[#6c3090] transition duration-200"
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

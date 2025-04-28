import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../store/currentUserAtom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageUrls = [
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Jocelyn&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Vivian&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Oliver&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Eden&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Jack&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Amaya&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Robert&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Jameson&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Sara&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Christian&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Jade&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
    "https://api.dicebear.com/9.x/avataaars/svg?seed=Wyatt&radius=50&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear&accessories[]&accessoriesColor[]&eyebrows=default&eyes=happy&facialHair[]&facialHairColor[]&mouth=smile",
  ];

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("authToken");

  const onSubmit = async (data) => {
    if (!currentUser || !currentUser.userId) {
      toast.error("User information is missing. Please log in again.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:8080/qubit/user/${currentUser.userId}`,
        {
          username: data.username,
          avatar: selectedImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setCurrentUser({
          ...currentUser,
          username: data.username,
          avatar: selectedImage,
        });
        toast.success("Profile updated successfully!");
        navigate("/my-profile");
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/edit-profile");
    }
    if (!token) {
      navigate("/login");
    }
    setSelectedImage(currentUser.avatar)
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-172">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100 my-10">
      <div className="bg-white shadow-lg rounded-2xl p-12 w-172">
        <div className="mb-4">
          <h1 className="font-medium text-gray-700 mb-3">Select Avatar</h1>
          <div className="grid grid-cols-3 gap-4">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Image ${idx}`}
                onClick={() => setSelectedImage(url)}
                className={`cursor-pointer w-12 h-12 object-cover ${
                  selectedImage === url ? "border border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Full name</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="text"
              defaultValue={currentUser.username}
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">
                Full name is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#883cb4] text-white py-2 mt-4 rounded-lg w-full font-semibold hover:bg-[#6c3090] transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

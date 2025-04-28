import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error(
        "Your confirmation password doesn’t match the original. Please ensure both passwords are the same."
      );
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/qubit/user/create`,
        {
          username: data.fullName,
          email: data.email,
          password: data.password,
          avatar:
            "https://tse1.mm.bing.net/th?id=OIP.Xh8JosTCRjhFjdiUzftycAHaHa&w=474&h=474&c=7",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        toast.success("Signup successful! Please login.", {
          onClose: () => navigate("/login"), // Navigate after toast closes
          autoClose: 2000, // Close after 2 seconds
        });
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleSignin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-[#883cb4] mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="text"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm mt-1">
                Full name is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                Email is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Password</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                Password is required
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                Confirm password is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-[#883cb4] text-white py-2 mt-4 rounded-lg w-full font-semibold hover:bg-[#6c3090] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p
          className="text-center text-[#883cb4] font-semibold mt-4 hover:cursor-pointer hover:text-[#6c3090] transition"
          onClick={handleSignin}
        >
          Already have an account? Sign In
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

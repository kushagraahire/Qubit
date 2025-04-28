import { useForm } from "react-hook-form";
import logo from "../assets/qubit-logo-svg.svg";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/qubit/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.status === 200){
        console.log(response.data)
        localStorage.setItem("authToken", response.data)
        toast.success("Login successfull")
        navigate("/")
        window.location.reload()
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      if (error.response?.status === 500){
        toast.error("Bad Credentials");
        return
      }
      toast.error("Login Failed");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <img className="h-12 mb-8" src={logo} alt="Logo" />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-[#883cb4] mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Password</label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#883cb4]"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-[#883cb4] text-white py-2 mt-4 rounded-lg w-full font-semibold hover:bg-[#6c3090] transition duration-200"
          >
            Sign In
          </button>

          <p
            className="text-center text-[#883cb4] font-semibold mt-4 hover:cursor-pointer hover:text-[#6c3090] transition"
            onClick={handleSignup}
          >
            Don't have an account? Sign Up
          </p>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

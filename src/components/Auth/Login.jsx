import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^[97]\s*(([0-9]\s*){8})$/,
      "phone number doesn't meet the right standard"
    ),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { signInFunc, sign_in_loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    signInFunc("+251" + data.phoneNumber, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full  gap-10 justify-center items-start w-full lg:w-1/2  p-[5%]"
    >
      <div className="w-full -mt-6 flex justify-center items-center"></div>
      <div className="flex flex-col gap-4">
        <p className="text-[#3170B5] font-semibold text-4xl">Sign In</p>
        <p className="text-[#626476] text-xs">
          Enter your phone number and password to login!
        </p>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1 items-start">
          <label className="text-sm text-N50 font-medium">Phone</label>
          <input
            className={`text-[#3170B5] placeholder:text-N95 placeholder:text-sm px-2 py-2.5 border border-N99 focus:border-[#3170B5] focus:ring-[#3170B5] focus:outline-none w-full rounded-md ${
              errors.email ? "border-red" : ""
            }`}
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-400 text-xs">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 items-start">
          <label className="text-sm text-N50 font-medium">Password</label>
          <div className="relative flex flex-col gap-2 w-full items-start select-none">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`text-[#3170B5] placeholder:text-N95 placeholder:text-sm px-2 py-2.5 border border-N99 focus:border-[#3170B5] focus:ring-[#3170B5] focus:outline-none w-full rounded-md ${
                errors.password ? "border-red" : ""
              }`}
              {...register("password")}
            />
            {showPassword && (
              <AiFillEyeInvisible
                onClick={() => setShowPassword(false)}
                className="text-xl  absolute top-2.5 right-3 text-[#3170B5] cursor-pointer"
              />
            )}
            {!showPassword && (
              <AiFillEye
                onClick={() => setShowPassword(true)}
                className="text-xl  absolute top-2.5 right-3 text-[#3170B5] cursor-pointer"
              />
            )}
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={sign_in_loading}
        type="submit"
        className={`${
          sign_in_loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#3170B5]"
        } w-full rounded-md text-white h-[40px]  px-4 sm:px-6 capitalize z-10 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in`}
      >
        {!sign_in_loading ? "Sign In" : "Loading..."}
      </button>
    </form>
  );
};

export default Login;

import React from "react";
import Logo from "../../assets/svg/logo.svg";
import Login from "../../components/Auth/Login";
const Auth = () => {
  return (
    <>
      <div className="w-full py-6 md:py-0 h-screen bg-[#F2F9FF] flex justify-center items-center px-2 md:px-0 prevent-select ">
        <div className="shadow-lg-soft rounded-2xl overflow-hidden bg-white flex  h-4/5 w-full md:w-4/5 2xl:w-3/5">
          {/* Login style */}
          <div className="hidden relative md:flex  bg-gray-100 w-1/2 h-full">
            <div className="h-1/2 w-full backdrop-blur-[6px] z-10"></div>
            <img
              src={Logo}
              alt="Logo"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[15%]"
            />
            <div className="bg-[#485FE5]/50 w-56 h-56 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          </div>

          <Login />
        </div>
      </div>
    </>
  );
};

export default Auth;

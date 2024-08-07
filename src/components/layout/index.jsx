import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#F0F2FF] w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col gap-5 w-full">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#F2F9FF] w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col w-[85vw] 2xl:w-[87vw] h-screen">
        <NavBar />
        <div className="flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

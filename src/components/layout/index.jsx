import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#F0F2FF] w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col calc-width h-screen">
        <NavBar />
        <div className="flex flex-col calc-height overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

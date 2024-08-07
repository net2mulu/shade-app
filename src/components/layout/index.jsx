import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#F0F2FF] w-screen h-screen flex">
      <SideBar />
      <>
        <NavBar />
        {children}
      </>
    </div>
  );
};

export default MainLayout;

import React from "react";
import Mols_logo from "../../assets/images/Mols_logo.png";
import Logo from "../../assets/svg/logo.svg";
import folder from "../../assets/svg/folder.svg";
import { Link, useLocation } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAddHomeWork } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-white shadow-lg w-[15vw] 2xl:w-[13vw] h-screen flex justify-between flex-col gap-2 p-4 z-30">
      <div className="py-4 w-full flex items-center justify-between gap-2">
        <img src={Logo} alt="Logo" className="w-8" />
        <p className="text-black font-bold text-xl">Shade Management</p>
      </div>
      <div className="h-4/5 flex flex-col justify-between items-center">
        <div className="w-full flex flex-col gap-2 items-center">
          <Link
            to="/dashboard"
            className={`${
              pathname === "/dashboard"
                ? "bg-[#3170B5]/10"
                : "hover:bg-N99/50 text-N60"
            } hover:bg-[#3170B5]/20 w-full flex gap-4 items-center justify-center px-2 py-2 cursor-pointer transition-all duration-300 ease-in-out rounded-lg text-[#3170B5]`}
          >
            <BiSolidDashboard className="text-xl" />
            <p className="font-medium text-sm whitespace-nowrap overflow-hidden w-3/5">
              Dashboard
            </p>
          </Link>

          <Link
            to="/shade"
            className={`${
              pathname === "/shade"
                ? "bg-[#3170B5]/10"
                : "hover:bg-N99/50 text-N60"
            } hover:bg-[#3170B5]/20 w-full flex gap-4 items-center justify-center px-2 py-2 cursor-pointer transition-all duration-300 ease-in-out rounded-lg text-[#3170B5]`}
          >
            <MdAddHomeWork className="text-xl" />
            <p className="font-medium text-sm whitespace-nowrap overflow-hidden w-3/5">
              Shades
            </p>
          </Link>
          <Link
            to="/enterprise"
            className={`${
              pathname === "/enterprise"
                ? "bg-[#3170B5]/10"
                : "hover:bg-N99/50 text-N60"
            } hover:bg-[#3170B5]/20 w-full flex gap-4 items-center justify-center px-2 py-2 cursor-pointer transition-all duration-300 ease-in-out rounded-lg text-[#3170B5]`}
          >
          <FaLayerGroup className="text-xl"  />
            <p className="font-medium text-sm whitespace-nowrap overflow-hidden w-3/5">
              Enterprise
            </p>
          </Link>
        </div>

      

        <div className="w-full text-center p-2 rounded-2xl bg-[#E6E6E6]/30 flex justify-center items-center flex-col gap-2">
          <img src={folder} className="w-16 -mt-10" alt="" />
          <p className="text-[#9E9E9E] font-semibold text-md">Powered by</p>
          <p className="text-[#9E9E9E] text-sm">
            F.D.R.E ministry of labour and skills{" "}
          </p>
          <img src={Mols_logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

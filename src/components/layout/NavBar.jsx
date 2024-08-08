import React, { useContext } from "react";
import DiagonalFlag from "../../assets/images/DiagonalFlag.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";

const NavBar = () => {
  const { user_data, user_data_loading, logOut } = useContext(AuthContext);
  const user = user_data?.registration_namespace?.labors[0];

  return (
    <>
      <header className=" z-20 flex items-center sticky justify-between w-full h-24 bg-white">
        <div className="flex items-center w-1/2 gap-8 lg:bg-transparent bg-emdmsPrimary"></div>
        <img
          src={DiagonalFlag}
          alt="Company Logo"
          className="absolute top-0 h-full -translate-x-1/2 left-1/2"
        />
        {user_data_loading ? ( 
          <div className="mr-10 rounded-md max-w-xs w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-200 rounded col-span-2 max-w-sm"></div>
                    <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            </div>
          </div>
        ) : (
          <>
            <Menu>
              <MenuButton className="mx-6 w-full">
                <div className="top-0 flex items-center justify-end px-1 space-x-2 bg-white">
                  <div className="hidden lg:block">
                    <div className="flex flex-col text-[#3170B5]">
                      <span className="font-semibold ">
                        {user?.first_name +
                          " " +
                          user?.father_name +
                          " " +
                          user?.grand_father_name}
                      </span>
                      <p className="text-xs block self-end">
                        ID: {user?.labor_id}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center px-2">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_problem_man_male_person_profile-512.png"
                      onError={(e) => {
                        e.target.src =
                          "https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_problem_man_male_person_profile-512.png";
                      }}
                      alt="Default Avatar"
                      className="hidden rounded-full md:block h-14 w-14 md:w-16 md:h-16 border-2 border-[#3170B5]"
                    />

                    {/* SVG icon for the dropdown */}
                  </div>
                </div>
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-[#3170B5] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button
                    onClick={() => logOut()}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    <AiOutlineLogout className="size-4 fill-[#3170B5]" />
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </>
        )}
      </header>
    </>
  );
};

export default NavBar;

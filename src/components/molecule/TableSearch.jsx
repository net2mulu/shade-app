import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const SearchInput = ({ searchQuery, setSearchQuery, placeholder }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <section className="w-1/3 pb-2 flex items-center gap-x-2 justify-end px-2">
      <button type="button" className="">
        <CiSearch className="w-6 h-6 text-black hover:text-black hover: opacity-90 z-10 hover:border-b" />
      </button>
      <input
        value={searchText}
        type="text"
        className="border w-full py-2 px-3 text-sm"
        placeholder={placeholder}
        onChange={(e) => {
          if (e.target.value === "") {
            setSearchQuery(null);
          } else {
            setSearchQuery(e.target.value);
          }
          setSearchText(e.target.value);
        }}
      />

      {searchQuery && (
        <button
          type="button"
          className=""
          onClick={() => {
            setSearchText("");
            setSearchQuery(null);
          }}
        >
          <IoCloseOutline className="w-6 h-6 text-black : opacity-90 z-10 hover:border-b" />
        </button>
      )}
    </section>
  );
};

export default SearchInput;

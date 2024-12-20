import React from "react";

const TabButtons = ({ options, status, setStatus }) => {
  return (
    <section className={`flex gap-4 my-4 text-sm font-medium w-1/2 `}>
      {options.map((option) => (
        <button
          type="button"
          className={`rounded-lg  px-8 py-2 capitalize ${
            option === status
              ? "bg-primary text-white font-semibold"
              : "bg-white text-[#9898A3] border"
          }`}
          onClick={() => setStatus(option)}
        >
          {option}
        </button>
      ))}
    </section>
  );
};

export default TabButtons;

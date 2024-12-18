import { Button } from "@headlessui/react";
import React from "react";
import Select from "react-select";

function handleTheme(theme) {
  return {
    ...theme,
    borderRadius: "5px",
    zIndex: 9999,
    colors: {
      ...theme.colors,
      primary25: "#3170B5",
      primary: "#3170B5",
      neutral50: "#3170B5",
      neutral80: "#3170B5",
    },
  };
}

const RegisterShade = ({ setIsOpen }) => {
  return (
    <form className="my-3 flex flex-col gap-4 items-start justify-start">
      {/* first block */}
      <h2 className="text-[#3170B5] text-2xl font-bold leading-4 mt-6">
        {" "}
        የማምረቻና የመሸጫ ቦታዎች ዝርዝር መረጃ መሰብሰቢያ ቅጽ
      </h2>
      <p className="text-sm capitalize w-4/5 text-[#425466]">
        Shade registration form
      </p>
      <div className="grid grid-cols-2 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-16 py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Manufacturing/Selling area is built is the site/specific name{" "}
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው የተገነባበት አካባቢ ሳይት/ ልዩ መጠሪያ ስም
          </span>
          <input
            type="text"
            id="name"
            placeholder="eg. megenagna"
            className="w-full p-2 border border-[#3170B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold ">
            Manufacturing/Sales Place/Block No
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው ስም/ብሎክ ቁጥር
          </span>
          <input
            type="text"
            placeholder="eg. block 14"
            id="name"
            className="w-full p-2 border border-[#3170B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
          />
        </div>
      </div>

      {/* second block */}
      <h2 className="text-[#3170B5] text-2xl font-bold leading-4 mt-6">አድራሻ</h2>
      <p className="text-sm capitalize w-3/4 text-[#425466]">
        Address Information
      </p>
      <div className="grid grid-cols-3 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-16 py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Region <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ክልል</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Zone/ Division <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ዞን/ክፍለ ከተማ</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            District/City administration <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወረዳ/ከተማ አስተዳደር</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Kebele
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ቀበሌ</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
      </div>

      {/* THIRD block */}
      <h2 className="text-[#3170B5] text-2xl font-bold">...</h2>

      <div className="grid grid-cols-2  py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Area of production(in km)
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው የተገነባበት አካባቢ ሳይት/ ልዩ መጠሪያ ስም
          </span>
          <input
            type="text"
            id="name"
            placeholder="eg. megenagna"
            className="w-full p-2 border border-[#3170B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Number of floors
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው ስም/ብሎክ ቁጥር
          </span>
          <input
            type="text"
            placeholder="eg. block 14"
            id="name"
            className="w-full p-2 border border-[#3170B5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-16 py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
            Does it have water? <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ክልል</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
          Does it have electricity?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ዞን/ክፍለ ከተማ</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
          Does it have a toilet? <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወረዳ/ከተማ አስተዳደር</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
          Is it suitable for disabled people?
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ቀበሌ</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-black text-lg font-semibold">
          Is it suitable for disabled people?
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ቀበሌ</span>
          <Select
            options={[]}
            isLoading={false}
            placeholder="Select Region"
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "N99" : "#3170B5",
                padding: "2px",
              }),
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: "rgb(156 163 175 / var(--tw-text-opacity))",
                fontSize: "0.85rem",
              }),
            }}
            theme={(theme) => handleTheme(theme)}
            className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
          />
        </div>
      </div>

      <div className="flex justify-end items-center w-full mt-4">
        <Button
          className="inline-flex items-center gap-2 w-32 justify-center rounded-md bg-[#3170B5] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterShade;

import React, { useEffect, useRef } from "react";
import Map from "../../assets/svg/addisAbabaMap.svg";
// import DashLineChart from "../../components/Dashboard/LineChart";
import TestChart from "../../components/Dashboard/TestChart";
import BarStacked from "../../components/Dashboard/StackedBar";
import RegisteredShadeTypes from "../../components/Dashboard/RegisterdAhadeTypes";

const Dashboard = () => {
  const cardList = [
    { color: "bg-[#0EB01D]", val: 1 },
    { color: "bg-[#FAAB3C]", val: 2 },
    { color: "bg-[#1F74EC]", val: 3 },
    { color: "bg-[#4E1BD9]", val: 4 },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 w-full p-6 h-full">
        <div className="grid grid-cols-4 gap-4 h-max w-full">
          <div className="grid col-span-1 grid-cols-2 gap-4 h-full w-full">
            {cardList.map((item) => (
              <div
                key={item.val}
                className="flex justify-center items-center gap-4 bg-white rounded-lg p-4"
              >
                <div className={`w-3 h-24 ${item.color} rounded-lg`}></div>
                <div className="h-full  flex flex-col justify-center gap-2">
                  <p className="text-2xl font-bold text-[#19497D]">79</p>
                  <p className=" text-[#959595]">Total Number of Shades</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col h-full w-full col-span-2 bg-white rounded-lg p-4">
            <div className=" flex items-center justify-between gap-2">
              <p className="font-medium text-xl  text-[#7E92A2]">
                Shades Type by Sub-city
              </p>

              <div className="flex items-center justify-center gap-6 text-[#7E92A2] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#15D1A4] rounded-full"></div>
                  <span className="">Union</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F8D8AB] rounded-full"></div>
                  <span className="">Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#B7DFED] rounded-full"></div>
                  <span className="">Partnership</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DDCBFC] rounded-full"></div>
                  <span className="">PLC</span>
                </div>
              </div>
            </div>
            <div className=" h-3/4 w-full">
              <BarStacked />
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full col-span-1 bg-white rounded-lg p-4 justify-between text-[#7E92A2]">
            <p className="font-medium">Enterprises located in the sub-city</p>
            <img
              src={Map}
              alt="Addis Ababa Map"
              className="w-3/5 place-self-center"
            />
            <div className="grid grid-cols-4 px-4 gap-4 items-center">
              {cardList.map((_, id) => (
                <div key={id} className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-300"></div>
                  <p className="text-[10px]">Lemi Kura</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-max  w-full">
          <div className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Registered Shade Types
            </p>
            <RegisteredShadeTypes />
          </div>
          <div className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Assigned number of shade per month
            </p>
            {/* <DashLineChart /> */}
            <TestChart />
            {/* <div className="h-[90%] bg-red-500 w-full flex flex-col justify-center items-center">
        
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-max  w-full">
          <div className="flex flex-col h-full col-span-3 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Registered Shade Types
            </p>
            {/* <TestChart /> */}
          </div>
          <div className="flex flex-col h-full col-span-1 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Assign number of shade per year
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

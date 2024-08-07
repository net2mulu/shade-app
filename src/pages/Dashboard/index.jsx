import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Map from "../../assets/svg/addisAbabaMap.svg";

const Dashboard = () => {
  const cardList = [1, 2, 3, 4];

  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef?.current?.getContext("2d");
      let myChart;

      const cleanupChart = () => {
        if (myChart) {
          myChart.destroy();
        }
      };

      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              data: [10, 12, 3, 8, 1, 4],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      return cleanupChart;
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-6 h-full">
        <div className="grid grid-cols-4 gap-4 h-max min-h-[30%] w-full">
          <div className="grid col-span-1 grid-cols-2 gap-4 h-full w-full">
            {cardList.map(() => (
              <div className="flex bg-white rounded-lg p-4">
                <div className="h-full w-full flex flex-col justify-center gap-2 border-l-4 pl-4 border-green-400">
                  <p className="text-2xl font-semibold text-[#19497D]">79</p>
                  <p className="font-light text-[#959595]">
                    Total Number of Shades
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Shades Type by Sub-city
            </p>
          </div>

          <div className="flex flex-col gap-4 h-full col-span-1 bg-white rounded-lg p-4 justify-between text-[#7E92A2]">
            <p className="font-medium">Enterprises located in the sub-city</p>
            <img
              src={Map}
              alt="Addis Ababa Map"
              className="w-3/5 place-self-center"
            />
            <div className="grid grid-cols-4 px-4 gap-4 items-center">
              {cardList.map(() => (
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-300"></div>
                  <p className="text-[10px]">Lemi Kura</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-max min-h-[30%] w-full">
          <div className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Registered Shade Types
            </p>
          </div>
          <div className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Assign number of shade per year
            </p>
            <div className="h-[90%] w-full flex flex-col justify-center items-center">
              {/* <canvas className="min-w-[100%]" ref={chartRef}></canvas> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 h-max min-h-[30%] w-full">
          <div className="flex flex-col h-full col-span-3 bg-white rounded-lg p-4">
            <p className="font-medium  text-[#7E92A2]">
              Registered Shade Types
            </p>
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

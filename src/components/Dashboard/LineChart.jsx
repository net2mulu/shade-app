import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Given shades", "Expired shades"],
  ["Jan", 654, 178],
  ["Feb", 912, 239],
  ["Mar", 375, 844],
  ["Apr", 826, 120],
  ["May", 531, 300],
  ["Jun", 923, 371],
  ["Jul", 788, 142],
  ["Aug", 918, 178],
  ["Sep", 863, 305],
  ["Oct", 961, 421],
  ["Nov", 895, 233],
  ["Dec", 983, 371],
];

export const options = {
  animation: {
    startup: true /* Need to add this for animations */,
    duration: 1000,
    easing: "out",
  },
  smoothline: "true",
  curveType: "function",
  legend: { position: "top" },
  colors: ["#FAAB3C", "#FF0000"],
  chartArea: { left: 80, top: 50, right: 40, bottom: 50 },
  hAxis: {
    title: "Months",
    baseline: 10,
    titleTextStyle: {
      color: "#7E92A2",
      fontSize: 14,
      bold: true,
    },
    textStyle: {
      color: "#7E92A2",
      fontSize: 12,
    },
  },
  vAxis: {
    title: "Number of shades",
    baseline: 10,
    titleTextStyle: {
      color: "#7E92A2",
      fontSize: 14,
      bold: true,
    },
    textStyle: {
      color: "#7E92A2",
      fontSize: 12,
    },
  },
};

const DashLineChart = () => {
  return (
    <Chart
      className="flex flex-col h-full col-span-2 rounded-lg"
      chartType="LineChart"
      data={data}
      width="100%"
      height="250px"
      options={options}
    />
  );
};

export default DashLineChart;

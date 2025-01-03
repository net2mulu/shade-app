import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

const ShadeTypeByMonth = () => {
  const data = [
    {
      label: "union",
      data: [
        {
          primary: "Aug",
          secondary: 53,
        },
        {
          primary: "Sep",
          secondary: 64,
        },
        {
          primary: "Oct",
          secondary: 69,
        },
        {
          primary: "Nov",
          secondary: 93,
        },
        {
          primary: "Dec",
          secondary: 81,
        },
        {
          primary: "Jan",
          secondary: 27,
        },
        {
          primary: "Feb",
          secondary: 71,
        },
        {
          primary: "Mar",
          secondary: 27,
        },
        {
          primary: "Apr",
          secondary: 96,
        },
        {
          primary: "May",
          secondary: 92,
        },
      ],
    },
    {
      label: "Private",
      data: [
        {
          primary: "Aug",
          secondary: 53,
        },
        {
          primary: "Sep",
          secondary: 64,
        },
        {
          primary: "Oct",
          secondary: 69,
        },
        {
          primary: "Nov",
          secondary: 93,
        },
        {
          primary: "Dec",
          secondary: 81,
        },
        {
          primary: "Jan",
          secondary: 27,
        },
        {
          primary: "Feb",
          secondary: 71,
        },
        {
          primary: "Mar",
          secondary: 27,
        },
        {
          primary: "Apr",
          secondary: 96,
        },
        {
          primary: "May",
          secondary: 92,
        },
      ],
    },
    {
      label: "Partnership",
      data: [
        {
          primary: "Aug",
          secondary: 53,
        },
        {
          primary: "Sep",
          secondary: 64,
        },
        {
          primary: "Oct",
          secondary: 69,
        },
        {
          primary: "Nov",
          secondary: 93,
        },
        {
          primary: "Dec",
          secondary: 81,
        },
        {
          primary: "Jan",
          secondary: 27,
        },
        {
          primary: "Feb",
          secondary: 71,
        },
        {
          primary: "Mar",
          secondary: 27,
        },
        {
          primary: "Apr",
          secondary: 96,
        },
        {
          primary: "May",
          secondary: 92,
        },
      ],
    },
    {
      label: "PLC",
      data: [
        {
          primary: "Aug",
          secondary: 59,
        },
        {
          primary: "Sep",
          secondary: 14,
        },
        {
          primary: "Oct",
          secondary: 95,
        },
        {
          primary: "Nov",
          secondary: 82,
        },
        {
          primary: "Dec",
          secondary: 24,
        },
        {
          primary: "Jan",
          secondary: 58,
        },
        {
          primary: "Feb",
          secondary: 14,
        },
        {
          primary: "Mar",
          secondary: 65,
        },
        {
          primary: "Apr",
          secondary: 28,
        },
        {
          primary: "May",
          secondary: 30,
        },
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
      },
    ],
    []
  );

  return (
    <article className="flex flex-col h-full w-full col-span-2 bg-white rounded-lg p-4">
      <section className=" flex items-center justify-between gap-2">
        <p className="font-medium text-[#1A1A1A]">Shades Type by Sub-city</p>

        <section className="flex items-center justify-center gap-6 text-[#7E92A2] text-xs">
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
        </section>
      </section>
      <section className=" h-3/4 w-full">
        <br />
        <br />
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            defaultColors: ["#15D1A4", "#F8D8AB", "#B7DFED", "#DDCBFC"],
            barWidth: 1,
          }}
        />
      </section>
    </article>
  );
};

export default ShadeTypeByMonth;

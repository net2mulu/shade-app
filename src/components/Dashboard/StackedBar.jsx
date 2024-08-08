import ResizableBox from "./ResizableBox";
import useDemoConfig from "./useDemoConfig";
import React from "react";
import { Chart } from "react-charts";

export default function BarStacked() {
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
    <>
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
    </>
  );
}

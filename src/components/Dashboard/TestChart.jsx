import React from "react";
import { Chart } from "react-charts";

export default function TestChart() {
  const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1,
  });

  return (
    <div>
      <MyChart
        elementType="line"
        setState={setState}
        activeDatumIndex={activeDatumIndex}
        activeSeriesIndex={activeSeriesIndex}
      />
    </div>
  );
}

function MyChart({
  elementType,
  activeDatumIndex,
  activeSeriesIndex,
  setState,
}) {
  const data = [
    {
      label: "Given shades",
      data: [
        { primary: "Jan", secondary: 53000, radius: undefined },
        { primary: "Feb", secondary: 64000, radius: undefined },
        { primary: "Mar", secondary: 30000, radius: undefined },
        { primary: "Apr", secondary: 67000, radius: undefined },
        { primary: "May", secondary: 82000, radius: undefined },
        { primary: "Jun", secondary: 88000, radius: undefined },
        { primary: "Jul", secondary: 5000, radius: undefined },
        { primary: "Aug", secondary: 9000, radius: undefined },
        { primary: "Sep", secondary: 36000, radius: undefined },
        { primary: "Oct", secondary: 48000, radius: undefined },
      ],
    },
    {
      label: "Expired Shades",
      data: [
        { primary: "Jan", secondary: 55000, radius: undefined },
        { primary: "Feb", secondary: 66000, radius: undefined },
        { primary: "Mar", secondary: 12000, radius: undefined },
        { primary: "Apr", secondary: 24000, radius: undefined },
        { primary: "May", secondary: 39000, radius: undefined },
        { primary: "Jun", secondary: 76000, radius: undefined },
        { primary: "Jul", secondary: 84000, radius: undefined },
        { primary: "Aug", secondary: 52000, radius: undefined },
        { primary: "Sep", secondary: 0, radius: undefined },
        { primary: "Oct", secondary: 40000, radius: undefined },
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
        elementType,
      },
    ],
    [elementType]
  );

  return (
    <>
      <br />
      <br />
      <div className="w-full h-[250px]">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            getDatumStyle: (datum, status) =>
              activeDatumIndex === datum.index &&
              activeSeriesIndex === datum.seriesIndex
                ? {
                    opacity: 1,
                    circle: {
                      r: 5,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 3,
                    },
                  }
                : activeDatumIndex === datum.index
                ? {
                    opacity: 1,
                    circle: {
                      r: 3,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 1,
                    },
                  }
                : datum.seriesIndex === activeSeriesIndex
                ? {
                    circle: {
                      r: 3,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 1,
                    },
                  }
                : status === "groupFocused"
                ? {
                    circle: {
                      r: 2,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0,
                    },
                  }
                : {
                    circle: {
                      r: 2,
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0,
                    },
                  },
            getSeriesStyle: (series) => {
              return {
                color: `url(#${series.index % 4})`,
                opacity:
                  activeSeriesIndex > -1
                    ? series.index === activeSeriesIndex
                      ? 1
                      : 0.3
                    : 1,
              };
            },
            onFocusDatum: (focused) =>
              setState({
                activeSeriesIndex: focused ? focused.seriesIndex : -1,
                activeDatumIndex: focused ? focused.index : -1,
              }),

            renderSVG: () => (
              <defs>
                <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#17EAD9" />
                  <stop offset="100%" stopColor="#6078EA" />
                </linearGradient>
                <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#ff8f10" />
                  <stop offset="100%" stopColor="#ff3434" />
                </linearGradient>
                <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#42E695" />
                  <stop offset="100%" stopColor="#3BB2B8" />
                </linearGradient>
                <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#ffb302" />
                  <stop offset="100%" stopColor="#ead700" />
                </linearGradient>
              </defs>
            ),
          }}
        />
      </div>
    </>
  );
}

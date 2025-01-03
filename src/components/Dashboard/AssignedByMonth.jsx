import React, { useMemo, useState } from "react";
import { Chart } from "react-charts";

import { gql, useQuery } from "@apollo/client";
import { generatePastMonths } from "../../utils/methods/dateConverter";
import { getTempClient } from "../../apollo/client";

const createDynamicQuery = () => {
  const months = generatePastMonths(10);
  const queries = months.map(
    ({ start_date, end_date, label }, index) => `
    ${label}: enterprise_assigned_sheds_aggregate(
      where: { assigned_at: { _gte: "${start_date}", _lt: "${end_date}" } }
    ) {
      aggregate {
        count
      }
    }
  `
  );
  return gql`
    query GetAssignedShedsByMonth {
      ${queries.join("\n")}
    }
  `;
};

const AssignedByMonth = () => {
  const [{ activeSeriesIndex, activeDatumIndex }, setState] = useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1,
  });

  const client = useMemo(() => getTempClient(), []);

  const { loading, error, data } = useQuery(createDynamicQuery(), {
    client,
  });

  if (loading || error) {
    return (
      <article className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4 animate-pulse" />

    );
  }


  return (
    <article className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
      <p className="font-medium  text-[#1A1A1A] capitalize">
        Assigned number of shade per month
      </p>
      <MyChart
        elementType="line"
        setState={setState}
        activeDatumIndex={activeDatumIndex}
        activeSeriesIndex={activeSeriesIndex}
        fetchedShedData={data}
      />
    </article>
  );
};

function MyChart({
  elementType,
  activeDatumIndex,
  activeSeriesIndex,
  setState,
  fetchedShedData
}) {
  const prepareChartData = (shedDatas) => {
    const keys = Object.keys(shedDatas);
    const newShedData = [];

    keys.forEach((key) => {
      newShedData.push({
        primary: key,
        secondary: shedDatas[key].aggregate.count,
        radius: undefined,
      });
    });

    return [{ label: "Given shades", data: newShedData }];
  };

  const SHEDS_DATA = useMemo(() => prepareChartData(fetchedShedData), [fetchedShedData]);


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
  createDynamicQuery();
  return (
    <>
      <br />
      <br />
      <div className="w-full h-[250px]">
        <Chart
          options={{
            data: SHEDS_DATA,
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

export default AssignedByMonth;

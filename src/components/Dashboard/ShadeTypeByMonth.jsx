import React, { useMemo } from "react";
import { Chart } from "react-charts";
import { generatePastMonths } from "../../utils/methods/dateConverter";
import { gql, useQuery } from "@apollo/client";
import { getTempClient } from "../../apollo/client";
import { GET_SHED_TYPES } from "../../apollo/base_data/query";
import { getRandomColor } from "../../utils/methods/colorGenerator";

const createDynamicQuery = (shedTypes) => {
  const queryKeys = [];

  if (shedTypes.length === 0) {
    return { query: GET_SHED_TYPES, queryKeys };
  }

  const months = generatePastMonths(10);

  const queries = [];

  shedTypes.forEach((shedType) => {
    const shedTypeKeys = [];

    const shedTypeQuery = months.map(({ start_date, end_date, label }) => {
      const key = shedType.name_json.en + "_" + label;
      shedTypeKeys.push({ key, month: label });

      return `
    ${key}:  enterprise_sheds_aggregate(where: {_and: {created_at: { _gte:  "${start_date}", _lt: "${end_date}" }, shed_type: {id: {_eq: "${shedType.id}"}}}}) {
    aggregate {
      count
    }
  }
  `;
    });

    queryKeys.push({
      shedType: shedType.name_json.en,
      keys: shedTypeKeys,
    });
    queries.push(...shedTypeQuery);
  });

  return {
    query: gql`
  query GetShedsByMonth {
    ${queries.join("\n")}
  }
`,
    queryKeys,
  };
};

const getGraphData = (data, queryKeys) => {
  const graphData = [];
  queryKeys.forEach((queryKey) => {
    graphData.push({
      label: queryKey.shedType,
      data: queryKey.keys.map((key) => {
        return {
          primary: key.month,
          secondary: data[key.key].aggregate.count,
        };
      }),
    });
  });

  return graphData;
};

const ShadeTypeByMonth = ({
  dataShadeTypes,
  loadingShadeTypes,
  errorShadeTypes,
}) => {
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
      },
    ],
    []
  );

  const client = useMemo(() => getTempClient(), []);

  const dynamicQuery = createDynamicQuery(
    loadingShadeTypes ? [] : dataShadeTypes.base_shed_types
  );

  const {
    loading: loadingMain,
    error: errorMain,
    data: dataMain,
  } = useQuery(dynamicQuery.query, {
    client,
    skip: loadingShadeTypes,
  });

  if (loadingShadeTypes || loadingMain || errorShadeTypes || errorMain) {
    return (
      <article className="flex flex-col h-full w-full col-span-2 bg-white rounded-lg p-4 animate-pulse" />
    );
  }

  const graphData = getGraphData(dataMain, dynamicQuery.queryKeys);
  const colors = Array.from({
    length: dataShadeTypes.base_shed_types.length,
  }).map((_) => getRandomColor());

  return (
    <article className="flex flex-col h-full w-full col-span-2 bg-white rounded-lg p-4">
      <section className=" flex items-center justify-between gap-2">
        <p className="font-medium text-[#1A1A1A]">Shades Type By Month</p>

        <section className="flex items-center justify-center gap-6 text-[#7E92A2] text-xs">
          {dataShadeTypes.base_shed_types.map((type, index) => (
            <div
              className="flex items-center gap-2"
              key={type.name_json.en + index + "--shad-type-month"}
            >
              <div
                className="w-2 h-2 rounded-full capitalize"
                style={{
                  backgroundColor: colors[index],
                }}
              />
              <span className="">{type.name_json.en}</span>
            </div>
          ))}
        </section>
      </section>

      <section className=" h-3/4 w-full">
        <br />
        <br />
        <Chart
          options={{
            data: graphData,
            primaryAxis,
            secondaryAxes,
            defaultColors: colors,
            barWidth: 1,
          }}
        />
      </section>
    </article>
  );
};

export default ShadeTypeByMonth;

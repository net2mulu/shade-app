import { gql, useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { GET_SHED_TYPES } from "../../apollo/base_data/query";
import { getTempClient } from "../../apollo/client";
import { getRandomColor } from "../../utils/methods/colorGenerator";

const getDynamicAggrigateQuery = (shedTypes) => {
  const queries = shedTypes.map(
    (shed) => `
      ${shed.name_json.en}: enterprise_sheds_aggregate(where: {shed_type_id: {_eq: "${shed.id}"}}) {
        aggregate {
          count
        }
      }
    `
  );
  queries.push(`
      total: enterprise_sheds_aggregate{
        aggregate {
          count
        }
      }
      `);
  return gql`
  query ShedTypeAggregates {
    ${queries.join("\n")}
  }
`;
};

const calculatePercentage = (aggrigatesData) => {
  const keys = Object.keys(aggrigatesData);
  const shadeTypes = [];

  keys.forEach((key) => {
    if (key === "total") return;
    const percentage =
      (aggrigatesData[key].aggregate.count /
        aggrigatesData.total.aggregate.count) *
      100;
    shadeTypes.push({
      name: key,
      percentage: `${percentage.toFixed(1)}%`,
    });
  });

  return {
    totalEnterprises: aggrigatesData.total.aggregate.count,
    shadeTypes,
  };
};

const RegisteredShadeTypes = ({
  dataShadeTypes,
  loadingShadeTypes,
  errorShadeTypes,
}) => {
  const client = useMemo(() => getTempClient(), []);

  const {
    loading: loadingAggrigate,
    data: dataAggrigate,
    error: errorAggrigate,
  } = useQuery(
    dataShadeTypes && dataShadeTypes.base_shed_types
      ? getDynamicAggrigateQuery(dataShadeTypes?.base_shed_types)
      : GET_SHED_TYPES,
    {
      client: client,
      skip: loadingShadeTypes || errorShadeTypes ? true : false,
    }
  );

  if (
    loadingShadeTypes ||
    loadingAggrigate ||
    errorShadeTypes ||
    errorAggrigate
  ) {
    return (
      <section className="flex flex-col h-full min-h-[38vh] animate-pulse col-span-2 bg-white rounded-lg p-4" />
    );
  }
  const ViewData = calculatePercentage(dataAggrigate);

  return (
    <section className="flex flex-col h-full col-span-2 bg-white rounded-lg p-4">
      <p className="font-medium text-[#1A1A1A]">Registered Shade Types</p>
      <div className="w-full   mt-12">
        <div className="flex items-center mx-2 mb-4">
          <span className="text-[#1A1A1A] text-3xl font-bold mr-2">
            {ViewData.totalEnterprises}
          </span>
          <span className="text-gray-500">Enterprises</span>
        </div>
        <div className="w-[98%]  justify-between flex items-center">
          {ViewData.shadeTypes.map((shadeType, i) => (
            <ShadePercentage
              key={i + "Percent"}
              keyIndex={i}
              shadeType={shadeType}
              zIndex={ViewData.shadeTypes.length - i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ShadePercentage = ({ keyIndex, shadeType, zIndex }) => {
  const BG_COLOR = getRandomColor();
  return (
    <section
      className={`flex flex-col gap-8  items-start justify-center`}
      style={{
        width: shadeType.percentage,
        zIndex,
      }}
    >
      <div
        className={`w-[110%]  h-8 rounded-full border-x-4 border-y-2 border-white `}
        style={{
          backgroundColor: BG_COLOR,
        }}
      />
      <div
        className={`text-[#959595] flex flex-col ${keyIndex !== 0 && "ml-[10%]"}`}
      >
        <div className="flex items-center justify-start gap-4">
          <div
            className={`w-2 h-2 rounded-full`}
            style={{
              backgroundColor: BG_COLOR,
            }}
          />

          <span className="text-lg font-bold">{shadeType.percentage}</span>
        </div>
        <span className="ml-6 text-gray-500">{shadeType.name}</span>
      </div>
    </section>
  );
};

export default RegisteredShadeTypes;

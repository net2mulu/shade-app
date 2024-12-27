import Chart from "react-google-charts";
import { getTempClient } from "../../apollo/client";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMBINED_CONSTRUCTION_STATUS } from "../../apollo/shades/query";

const options = {
  legend: "none",
  pieSliceText: "none",
  pieHole: 0.76,
  colors: ["#EED991", "#FB8D8D", "#15D1A4"],
  chartArea: {
    height: "10px"
  }
};

const ShadeStatus = () => {
  const client = useMemo(() => getTempClient(), []);

  const { loading, error, data } = useQuery(GET_COMBINED_CONSTRUCTION_STATUS, {
    client,
  });

  if (loading || error) {
    return (
      <article className="flex flex-col gap-4 h-full animate-pulse col-span-1 bg-white rounded-lg py-4 px-6 justify-between text-[#7E92A2]" />
    );
  }

  const under_construction =
    data?.total?.aggregate?.count -
    (data?.completed?.aggregate?.count +
      data?.stopped?.aggregate?.count);

      console.log(data?.total?.aggregate?.count, data?.completed?.aggregate?.count, data?.stopped?.aggregate?.count , under_construction)

  const CHART_DATA = [
    ["Status", "Count"],
    ["Completed", data?.completed?.aggregate?.count],
    ["Under Construction", under_construction < 0 ? 0 : under_construction],
    ["Stopped", data?.stopped?.aggregate?.count],
  ];

  return (
    <article className="flex flex-col gap-4 h-full col-span-1 bg-white rounded-lg py-4 px-6 justify-between text-[#7E92A2]">
      <p className="font-medium text-[#1A1A1A]">Shade Construction Status</p>

      <Chart
        chartType="PieChart"
        width="100%"
        height="150px"
        data={CHART_DATA}
        options={options}
      />

      <section className="capitalize">
        <div className="flex justify-between items-center text-xs text-[#959595] font-medium mb-3">
          <p className="">Completed</p>
          <p className="text-black font-semibold text-sm">
            {data?.completed?.aggregate?.count}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs text-[#959595] font-medium mb-3">
          <p className="">Under Construction</p>
          <p className="text-black font-semibold text-sm">
            {under_construction < 0 ? 0 : under_construction}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs text-[#959595] font-medium">
          <p className="">Stopped</p>
          <p className="text-black font-semibold text-sm">
            {data?.stopped?.aggregate?.count}
          </p>
        </div>
      </section>
    </article>
  );
};

export default ShadeStatus;

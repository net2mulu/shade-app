import { useQuery } from "@apollo/client";
import { getTempClient } from "../../apollo/client";
import { useMemo } from "react";
import { GET_ENTERPRISES_ASSIGNED_SHEDS } from "../../apollo/shades/query";
import { convertTime, formatDateString } from "../../utils/methods/dateConverter";

const RecentlyAssignedEnterprises = () => {
  const client = useMemo(() => getTempClient(), []);

  const { loading, data, error } = useQuery(GET_ENTERPRISES_ASSIGNED_SHEDS, {
    variables: {},
    client: client,
  });

  if (loading || error) {
    return (
      <article className="flex flex-col h-full col-span-1 animate-pulse bg-white rounded-lg p-4" />
    );
  }

  const SHEDSLIST = data?.enterprise_assigned_sheds;

  return (
    <article className="flex flex-col h-full col-span-1 bg-white rounded-lg p-4">
      <p className="font-medium  text-[#1A1A1A]">Recently Assigned Sheds</p>

      {SHEDSLIST.map((shed) => (
        <section index={shed.shed.id + "recently-assigned"} className="flex line-clamp-1 justify-between items-start mt-6" >
          <div className="">
            <p className="text-sm line-clamp-1">{shed.shed.name.en}</p>
            <p className="text-[9px] text-gray-300 uppercase font-semibold">{convertTime(shed.created_at) + " , " + formatDateString(shed.created_at)}</p>
          </div>
        </section>
      ))}
    </article>
  );
};

export default RecentlyAssignedEnterprises;

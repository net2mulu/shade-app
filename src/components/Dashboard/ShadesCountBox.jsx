import { useMemo } from "react";
import { getTempClient } from "../../apollo/client";
import { GET_COMBINED_SHED_COUNT } from "../../apollo/shades/query";
import { useQuery } from "@apollo/client";

const ShadesCountBox = () => {
  const client = useMemo(() => getTempClient(), []);

  const { loading, error, data } = useQuery(GET_COMBINED_SHED_COUNT, {
    client,
  });

  if (loading || error) {
    return (
      <article className="grid col-span-1 grid-cols-2 gap-4 h-full w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={"inx-" + index}
            className="flex animate-pulse justify-center items-center gap-4 bg-white rounded-lg p-4"
          >
            <div className={`w-3 h-24 `} />

            <div className="h-full  flex flex-col justify-center gap-2">
              <p className="text-2xl font-bold text-[#19497D]" />
              <p className=" text-[#959595]" />
            </div>
          </div>
        ))}
      </article>
    );
  }
  


  return (
    <article className="grid col-span-1 grid-cols-2 gap-4 h-full w-full">
      <section className="flex justify-center items-center gap-4 bg-white rounded-lg p-4">
        <div className={`w-3 h-24 bg-[#0EB01D] rounded-lg`}></div>
        <div className="h-full  flex flex-col justify-center gap-2">
          <p className="text-2xl font-bold text-[#19497D]">
            {data?.totalShedsCount?.aggregate?.count}
          </p>

          <p className=" text-[#959595] font-poppins text-sm font-medium">
            Total Number of Shades
          </p>
        </div>
      </section>
      <section className="flex justify-center items-center gap-4 bg-white rounded-lg p-4">
        <div className={`w-3 h-24 bg-[#FAAB3C] rounded-lg`}></div>
        <div className="h-full  flex flex-col justify-center gap-2">
          <p className="text-2xl font-bold text-[#19497D]">
            {data?.unassignedShedsCount?.aggregate?.count}
          </p>

          <p className=" text-[#959595] font-poppins text-sm font-medium">
            Total Unassigned Shades
          </p>
        </div>
      </section>
      <section className="flex justify-center items-center gap-4 bg-white rounded-lg p-4">
        <div className={`w-3 h-24 bg-[#1F74EC] rounded-lg`}></div>
        <div className="h-full  flex flex-col justify-center gap-2">
          <p className="text-2xl font-bold text-[#19497D]">
            {data?.assignedShedsCount?.aggregate?.count}
          </p>
          <p className=" text-[#959595] font-poppins text-sm font-medium">
            Total Assigned Shades
          </p>
        </div>
      </section>
      <section className="flex justify-center items-center gap-4 bg-white rounded-lg p-4">
        <div className={`w-4 h-24 bg-[#4E1BD9] rounded-lg`}></div>
        <div className="h-full  flex flex-col justify-center gap-2">
          <p className="text-2xl font-bold text-[#19497D]">
            {data?.completedConstructionsCount?.aggregate?.count}
          </p>

          <p className=" text-[#959595] font-poppins text-sm font-medium">
            Total Construction Completed
          </p>
        </div>
      </section>
    </article>
  );
};

export default ShadesCountBox;

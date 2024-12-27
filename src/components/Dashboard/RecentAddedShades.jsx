import { useQuery } from "@apollo/client";
import { GET_SHEDS } from "../../apollo/shades/query";
import { getTempClient } from "../../apollo/client";
import { useMemo } from "react";
import ShadeTable from "../Shade/ShadeTable";

const RecentAddedShades = () => {
  const client = useMemo(() => getTempClient(), []);

  const { loading, data, error } = useQuery(GET_SHEDS, {
    variables: {
      limit: 5,
      offset: 0,
    },
    client: client,
  });

  if (loading || error) {
    return (
      <section className="flex flex-col h-full min-h-[25vh] animate-pulse col-span-3 bg-white rounded-lg p-4" />
    );
  }
  return (
    <section className="flex flex-col h-full min-h-[35vh] col-span-3 bg-white rounded-lg p-4">
      <p className="font-medium  text-[#1A1A1A]">Recently Added Shades</p>
      <ShadeTable
        isLoading={loading}
        shadsList={loading ? [] : data}
        tabStatus={null}
        setIsOpenAssignModal={null}
        setSelectedShade={null}
        setIsOpenEditModal={null}
        setIsView={null}
      />
    </section>
  );
};

export default RecentAddedShades;

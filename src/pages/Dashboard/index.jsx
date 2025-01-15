import ShadeTypeByMonth from "../../components/Dashboard/ShadeTypeByMonth";
import RegisteredShadeTypes from "../../components/Dashboard/RegisterdAhadeTypes";
import ShadesCountBox from "../../components/Dashboard/ShadesCountBox";
import RecentAddedShades from "../../components/Dashboard/RecentAddedShades";
import RecentlyAssignedEnterprises from "../../components/Dashboard/RecentlyAssignedEnterprises";
import ShadeStatus from "../../components/Dashboard/ShadeStatus";
import AssignedByMonth from "../../components/Dashboard/AssignedByMonth";
import { GET_SHED_TYPES } from "../../apollo/base_data/query";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { getTempClient } from "../../apollo/client";

const Dashboard = () => {
  const client = useMemo(() => getTempClient(), []);

  const {
    loading: loadingShadeTypes,
    error: errorShadeTypes,
    data: dataShadeTypes,
  } = useQuery(GET_SHED_TYPES, {
    client,
  });

  return (
    <>
      <div className="flex flex-col gap-4 w-full p-6 h-full">
        <div className="grid grid-cols-4 gap-4 h-max w-full">
          <ShadesCountBox />
          <ShadeTypeByMonth
            dataShadeTypes={dataShadeTypes}
            loadingShadeTypes={loadingShadeTypes}
            errorShadeTypes={errorShadeTypes}
          />

          <ShadeStatus />
        </div>
        <div className="grid grid-cols-4 gap-4 h-max  w-full">
          <RegisteredShadeTypes
            dataShadeTypes={dataShadeTypes}
            loadingShadeTypes={loadingShadeTypes}
            errorShadeTypes={errorShadeTypes}
          />
          <AssignedByMonth />
        </div>
        <div className="grid grid-cols-4 gap-4 h-max pb-4  w-full">
          <RecentAddedShades />
          <RecentlyAssignedEnterprises />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

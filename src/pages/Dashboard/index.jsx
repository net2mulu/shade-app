import ShadeTypeByMonth from "../../components/Dashboard/ShadeTypeByMonth";
import RegisteredShadeTypes from "../../components/Dashboard/RegisterdAhadeTypes";
import ShadesCountBox from "../../components/Dashboard/ShadesCountBox";
import RecentAddedShades from "../../components/Dashboard/RecentAddedShades";
import RecentlyAssignedEnterprises from "../../components/Dashboard/RecentlyAssignedEnterprises";
import ShadeStatus from "../../components/Dashboard/ShadeStatus";
import AssignedByMonth from "../../components/Dashboard/AssignedByMonth";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-6 h-full">
        <div className="grid grid-cols-4 gap-4 h-max w-full">
          <ShadesCountBox />
          <ShadeTypeByMonth />

          <ShadeStatus />
        </div>
        <div className="grid grid-cols-4 gap-4 h-max  w-full">
          <RegisteredShadeTypes />
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

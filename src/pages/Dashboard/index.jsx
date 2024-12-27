import BarStacked from "../../components/Dashboard/StackedBar";
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
          <div className="flex flex-col h-full w-full col-span-2 bg-white rounded-lg p-4">
            <div className=" flex items-center justify-between gap-2">
              <p className="font-medium text-[#1A1A1A]">
                Shades Type by Sub-city
              </p>

              <div className="flex items-center justify-center gap-6 text-[#7E92A2] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#15D1A4] rounded-full"></div>
                  <span className="">Union</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F8D8AB] rounded-full"></div>
                  <span className="">Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#B7DFED] rounded-full"></div>
                  <span className="">Partnership</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DDCBFC] rounded-full"></div>
                  <span className="">PLC</span>
                </div>
              </div>
            </div>
            <div className=" h-3/4 w-full">
              <BarStacked />
            </div>
          </div>

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

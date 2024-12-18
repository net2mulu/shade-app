import Loader from "../loader/index";

const TableLoader = ({ colLength }) => {
  return (
    <tbody>
      <tr className="py-20">
        <td colSpan={colLength} className="py-20 w-full  text-center ">
          <Loader containerClass="py-0" iconColor={"#3170B5"} iconSize={16} />
          <p className="mt-2 text-sm text-[#9898A3]">Loading...</p>
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoader;

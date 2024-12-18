import React from "react";
import empty from "../../assets/images/empty.png";
const EmptyTable = ({ message, colLength }) => {
  return (
    <tbody>
      <tr className="py-20">
        <td colSpan={colLength} className="py-20 w-full text-center ">
          <div className="flex flex-col items-center">
            <img src={empty} alt="empty" className="w-20" />
            <p className="mt-4 text-sm text-[#9898A3]">{message}</p>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default EmptyTable;

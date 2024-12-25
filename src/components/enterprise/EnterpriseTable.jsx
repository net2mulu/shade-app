import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TableLoader from "../loader/tableLoader";
import EmptyTable from "../../components/Shade/EmptyTable";
import { getColumns } from "../../utils/cols/enterpriseCols";

const EnterpriseTable = ({
  isLoading,
  enterpriseList,
  setIsOpenEditModal,
  setSelectedEnterpise,
  setIsView,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = getColumns(setIsOpenEditModal, setSelectedEnterpise, setIsView);
  const table = useReactTable({
    data: enterpriseList?.enterprise_enterprises ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    onPaginationChange: setPagination,
  });

  return (
    <article className="overflow-x-auto">
      <table className="w-full border-0 bg-white pb-10 min-w-max overflow-hidden">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[#F8FAFC]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`font-inter font-semibold text-center text-xs text-[#4d515a] capitalize py-5 border-0 px-4 sm:px-6`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {isLoading && <TableLoader colLength={columns.length} />}

        {!isLoading &&
          enterpriseList?.enterprise_enterprises &&
          enterpriseList?.enterprise_enterprises.length === 0 && (
            <EmptyTable message={"No items found"} colLength={columns.length} />
          )}

        {!isLoading &&
          enterpriseList?.enterprise_enterprises &&
          enterpriseList?.enterprise_enterprises.length > 0 && (
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-0 hover:bg-[#F8FAFC] font-outfit capitalize text-sm `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`py-3 border-b border-b-[#E2E8F0] border-dashed text-center px-4 sm:px-6`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
      </table>
    </article>
  );
};

export default EnterpriseTable;

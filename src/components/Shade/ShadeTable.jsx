import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TableLoader from "../loader/tableLoader";
import EmptyTable from "./EmptyTable";
import { getColumns } from "../../utils/cols/tableCols";

const ShadeTable = ({ isLoading, shadsList, tabStatus, setIsOpenAssignModal, setSelectedShade }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = getColumns(tabStatus, setIsOpenAssignModal, setSelectedShade);
  const table = useReactTable({
    data: shadsList?.enterprise_sheds ?? [],
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
      <table className="w-full border-0 bg-white pb-10 min-w-max">
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
          shadsList?.enterprise_sheds &&
          shadsList?.enterprise_sheds.length === 0 && (
            <EmptyTable message={"No items found"} colLength={columns.length} />
          )}

        {!isLoading &&
          shadsList?.enterprise_sheds &&
          shadsList?.enterprise_sheds.length > 0 && (
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

export default ShadeTable;

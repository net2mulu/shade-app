import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { formatDateString } from "../methods/dateConverter";
const columnHelper = createColumnHelper();

export const getColumns = (
  setIsOpenEditModal,
  setSelectedEnterpise,
  setIsView
) => {
  return [
    columnHelper.accessor("name", {
      id: "name",
      cell: (props) => (
        <p className="clamp-1 text-primary font-medium capitalize font-outfit">
          {props.row.original.enterprise[0].namejson.en}
        </p>
      ),
      header: () => <span className="uppercase">Shade name</span>,
    }),
    columnHelper.accessor("addresses", {
      id: "addresses",
      cell: (props) => (
        <div className="flex justify-center">
          <p className="clamp-1">
            {props.row.original.enterprise[0].addresses.sub_city ?? "-"}
          </p>
        </div>
      ),
      header: () => <span className="uppercase">Sub City</span>,
    }),
    columnHelper.accessor("sheds", {
      id: "sheds",
      cell: (props) => (
        <div className="flex justify-center">
          <p className="clamp-1">
            {props.row.original.assigned_sheds_aggregate.aggregate.count}
          </p>
        </div>
      ),
      header: () => <span className="uppercase">Shades COunt</span>,
    }),
    columnHelper.accessor("addresses", {
      id: "addresses",
      cell: (props) => (
        <div className="flex justify-center">
          <p className="clamp-1">
            {formatDateString(props.row.original.created_at)}
          </p>
        </div>
      ),
      header: () => <span className="uppercase">Sub City</span>,
    }),
    columnHelper.accessor("Action", {
      id: "action",
      cell: (props) => (
        <section className="flex justify-center">
          <div className="flex justify-start items-center gap-1">
            <button
              className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#4D515A] group relative"
              onClick={() => {
                setIsOpenEditModal(true);
                setSelectedEnterpise(props.row.original);
                setIsView(false);
              }}
            >
              <MdOutlineModeEdit className="w-4 h-6" />
              <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                edit
              </p>
            </button>
            <button
              className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#4D515A] group relative"
              onClick={() => {
                setIsOpenEditModal(true);
                setSelectedEnterpise(props.row.original);
                setIsView(true);
              }}
            >
              <IoEyeOutline className="w-4 h-6" />
              <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                view
              </p>
            </button>
          </div>
        </section>
      ),
      header: () => <span>Action</span>,
    }),
  ];
};

import { createColumnHelper } from "@tanstack/react-table";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TabStatusOptions } from "../../pages/Shade";
import { formatDateString } from "../methods/dateConverter";
const columnHelper = createColumnHelper();

export const getColumns = (
  tabStatus,
  setIsOpenAssignModal,
  setSelectedShade
) => {
  return [
    columnHelper.accessor("name", {
      id: "name",
      cell: (props) => (
        <p className="clamp-1 text-primary font-medium capitalize font-outfit">
          {props.row.original.name.en}
        </p>
      ),
      header: () => <span className="uppercase">Shade name</span>,
    }),
    columnHelper.accessor("block_no", {
      id: "block_no",
      cell: (props) => (
        <p className="clamp-1">{props.row.original.block_no}</p>
      ),
      header: () => <span className="uppercase">Block No.</span>,
    }),
    columnHelper.accessor("assigned_sheds", {
      id: "assigned_sheds",
      cell: (props) => (
        <div className="flex justify-center">
          <p
            className={
              props.row.original.assigned_sheds.length > 0
                ? "px-4 py-1 text-xs text-[#E11D48] bg-[#FFE4E680] w-fit rounded-full font-semibold"
                : " px-4 py-1 text-xs text-[#707070] bg-[#CBCBCB80] w-fit rounded-full font-semibold"
            }
          >
            {props.row.original.assigned_sheds.length > 0
              ? "assigned"
              : "Not assigned"}
          </p>
        </div>
      ),
      header: () => <span className="uppercase">Status</span>,
    }),
    columnHelper.accessor("service_type", {
      id: "service_type",
      cell: (props) => (
        <p className="clamp-1">
          {props.row.original.service_type.name_json.en}
        </p>
      ),
      header: () => <span className="uppercase">Service type</span>,
    }),
    columnHelper.accessor("created_at", {
      id: "created_at",
      cell: (props) => (
        <p className="clamp-1">
          {formatDateString(props.row.original.created_at)}
        </p>
      ),
      header: () => <span className="uppercase">Issued on</span>,
    }),
    columnHelper.accessor("Action", {
      id: "action",
      cell: (props) => (
        <section className="flex justify-center">
          <div className="flex justify-start items-center gap-1">
            <button className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#4D515A] group relative">
              <MdOutlineModeEdit className="w-4 h-6" />
              <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                edit
              </p>
            </button>
            <button className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#4D515A] group relative">
              <IoEyeOutline className="w-4 h-6" />
              <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                view
              </p>
            </button>
            {tabStatus === TabStatusOptions[1] && (
              <button
                className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#4D515A] group relative"
                onClick={() => {
                  setIsOpenAssignModal(true);
                  setSelectedShade({
                    id: props.row.original.id,
                    name: props.row.original.name.en,
                  });
                }}
              >
                <AiOutlineUsergroupAdd className="w-4 h-6" />
                <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  assign
                </p>
              </button>
            )}
            <button className="text-sm border-0 font-medium rounded-md hover:opacity-60 p-1 text-[#E11D48] group relative">
              <RiDeleteBinLine className="w-4 h-6" />
              <p className="text-[8px] absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                delete
              </p>
            </button>
          </div>
        </section>
      ),
      header: () => <span>Action</span>,
    }),
  ];
};

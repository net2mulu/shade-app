import React, { useState, useContext, useMemo } from "react";
import ReactPaginate from "react-paginate";
import ShadeFilterTab from "../../components/Shade/ShadeFilterTab";
import ShadeTable from "../../components/Shade/ShadeTable";
import { ShadeContext } from "../../context/ShadeContext";

import AddShade from "../../components/modals/shade/addShades";
import { useQuery } from "@apollo/client";
import {
  GET_ASSIGNED_SHEDS,
  GET_SHEDS,
  GET_UNASSIGNED_SHEDS,
} from "../../apollo/shades/query";
import { getTempClient } from "../../apollo/client";
import TabButtons from "../../components/molecule/TabsButton";
import AssignShadeModal from "../../components/modals/shade/addShades/assignShed";
export const TabStatusOptions = ["all", "created", "assigned"];

export const getQuery = (selectedTab) => {
  switch (selectedTab) {
    case TabStatusOptions[1]:
      return GET_UNASSIGNED_SHEDS;

    case TabStatusOptions[2]:
      return GET_ASSIGNED_SHEDS;

    default:
      return GET_SHEDS;
  }
};

const Shade = () => {
  const { itemsPerPage, total, handlePageClick } = useContext(ShadeContext);

  const [isOpenRegisterModal, setIsOpennRegisterModal] = useState(false);
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);
  const [selectedShade, setSelectedShade] = useState(null)

  const [tabStatus, setTabStatus] = useState(TabStatusOptions[0]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const client = useMemo(() => getTempClient(), []);
  const { loading, data, refetch } = useQuery(getQuery(tabStatus), {
    variables: {
      limit: pagination.pageSize,
    },
    client: client,
  });

  return (
    <>
      <AddShade
        isOpenRegisterModal={isOpenRegisterModal}
        setIsOpennRegisterModal={setIsOpennRegisterModal}
        refetch={refetch}
        
      />
      <AssignShadeModal
        isOpen={isOpenAssignModal}
        setIsOpen={setIsOpenAssignModal}
        selectedShade={selectedShade}
        setSelectedShade={setSelectedShade}
        refetch={refetch}
      />

      <div className="my-2 p-4 px-6 w-full flex flex-col justify-between h-full ">
        <div className="w-full flex flex-col gap-2">
          <>
            <div className="md:flex-row flex flex-col justify-between space-y-4 md:space-y-0 w-full items-center">
              <div>
                <p className="text-2xl font-semibold text-[#3170B5]">
                  List of Shades
                </p>
                <p className="text-xs text-[#9898A3] max-w-md">
                  Here is the list of all the shades created without filters of
                  assigned and expired shades.
                </p>
              </div>

              <button
                onClick={() => setIsOpennRegisterModal(true)}
                className="bg-[#3170B5] hover:bg-[#3170B5]/60 text-white px-4 py-2 rounded-md"
              >
                Add New Shade
              </button>
            </div>

            <ShadeFilterTab />
            <TabButtons
              options={TabStatusOptions}
              status={tabStatus}
              setStatus={setTabStatus}
            />
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
              <div className="w-full gap-4 h-[60vh]  py-1 pb-3 relative rounded-lg">
                <ShadeTable
                  isLoading={loading}
                  shadsList={loading ? [] : data}
                  tabStatus={tabStatus}
                  setIsOpenAssignModal={setIsOpenAssignModal}
                  setSelectedShade={setSelectedShade}
                />
              </div>
            </div>
          </>
        </div>
        <div className="flex justify-center items-end md:justify-end">
          {
            <ReactPaginate
              renderOnZeroPageCount={false}
              breakLabel="..."
              breakClassName="bg-white font-bold text-center border border-white rounded-md px-3 py-1"
              nextLabel="Next >"
              nextClassName="border border-[#3170B5]  space-x-2 items-center  flex text-[#3170B5] px-4 py-1 ml-2"
              // onPageChange={handlePageClick}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(total / itemsPerPage)}
              previousLabel="< Previous"
              previousClassName="border border-[#3170B5]  space-x-2 items-center  flex text-[#3170B5] px-4 py-1 mr-2"
              containerClassName=""
              className="flex justify-center text-[#3170B5]  items-end md:justify-end  mr-5 mb-4"
              pageLinkClassName="px-3 py-2 "
              pageClassName="bg-[#3170B5] py-1 rounded-md border border-[#005656] mx-1"
              activeLinkClassName="text-white w-full rounded-md px-2 text-[#3170B5]"
              activeClassName="text-[#3170B5] text-white"
            />
          }
        </div>
      </div>
    </>
  );
};

export default Shade;

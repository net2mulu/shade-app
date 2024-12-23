import React, { useState, useMemo } from "react";
import ShadeFilterTab from "../../components/Shade/ShadeFilterTab";
import ShadeTable from "../../components/Shade/ShadeTable";

import { useQuery } from "@apollo/client";
import {
  GET_ASSIGNED_SHEDS,
  GET_SHEDS,
  GET_UNASSIGNED_SHEDS,
} from "../../apollo/shades/query";
import { getTempClient } from "../../apollo/client";
import TabButtons from "../../components/molecule/TabsButton";
import Pagination from "../../components/molecule/Pagination";
import ModalContainer from "../../components/modals/ModalContainer";
import RegisterShade from "../../components/Shade/RegisterShade";
import AssignShade from "../../components/Shade/AssignShade";
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
  const [isOpenRegisterModal, setIsOpennRegisterModal] = useState(false);
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);
  const [selectedShade, setSelectedShade] = useState(null);

  const [tabStatus, setTabStatus] = useState(TabStatusOptions[0]);

  const [pagination, setPagination] = useState({
    perPage: 10,
    currentPage: 0,
    offset: 0,
  });

  const client = useMemo(() => getTempClient(), []);
  const { loading, data, refetch } = useQuery(getQuery(tabStatus), {
    variables: {
      limit: pagination.perPage,
      offset: pagination.offset,
    },
    client: client,
  });

  return (
    <>
      <ModalContainer
        isOpen={isOpenRegisterModal}
        setIsOpen={setIsOpennRegisterModal}
        refetch={refetch}
        title="Register Shade"
      >
        <RegisterShade setIsOpen={setIsOpennRegisterModal} refetch={refetch} />
      </ModalContainer>

      <ModalContainer
        isOpen={isOpenAssignModal}
        setIsOpen={setIsOpenAssignModal}
        refetch={refetch}
        title="Assign Shades for Enterprises"
      >
        <AssignShade
          selectedShade={selectedShade}
          setIsOpen={setIsOpenAssignModal}
          refetch={refetch}
        />
      </ModalContainer>

      <div className="my-2 p-4 px-6 w-full flex flex-col justify-between h-full">
        <div className="w-full flex flex-col gap-2">
          <>
            <div className="md:flex-row flex flex-col justify-between space-y-4 md:space-y-0 w-full items-center">
              <div>
                <p className="text-2xl font-semibold text-[#3170B5]">
                  List of Shades
                </p>
                <p className="text-xs text-[#9898A3] max-w-md">
                  Here is the list of all the shades created with filters of
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
              <div className="w-full gap-4 h-[62vh] overflow-y-scroll py-1 pb-3 relative rounded-lg">
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
      </div>
      <Pagination
        loading={loading}
        pagination={pagination}
        setPagination={setPagination}
        totalPages={
          loading ? 0 : data?.enterprise_sheds_aggregate?.aggregate?.count
        }
        refetch={refetch}
      />
    </>
  );
};

export default Shade;

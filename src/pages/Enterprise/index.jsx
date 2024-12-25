import React, { useState, useMemo } from "react";
import ShadeFilterTab from "../../components/Shade/ShadeFilterTab";

import { useQuery } from "@apollo/client";
import { GET_ENTERPRISES } from "../../apollo/shades/query";
import { getTempClient } from "../../apollo/client";
import Pagination from "../../components/molecule/Pagination";
import ModalContainer from "../../components/modals/ModalContainer";
import EnterpriseTable from "../../components/enterprise/EnterpriseTable";
import AddEnterprsise from "../../components/enterprise/AddEnterprsise";
export const TabStatusOptions = ["all", "created", "assigned"];

const Enterprise = () => {
  const [isOpenRegisterModal, setIsOpennRegisterModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedEnterprise, setSelectedEnterpise] = useState(null);
  const [isView, setIsView] = useState(false);

  const [pagination, setPagination] = useState({
    perPage: 10,
    currentPage: 0,
    offset: 0,
  });

  const client = useMemo(() => getTempClient(), []);
  const { loading, data, refetch } = useQuery(GET_ENTERPRISES, {
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
        title={"Register Enterprise"}
        afterClose={() => {
          setIsView(false);
          setSelectedEnterpise(null);
        }}
      >
        <AddEnterprsise setIsOpen={setIsOpennRegisterModal} refetch={refetch} />
      </ModalContainer>

      <ModalContainer
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        title={isView ? "Enterprise Information" : "Edit Enterprise"}
        afterClose={() => {
          setIsView(false);
          setSelectedEnterpise(null);
        }}
      >
        <AddEnterprsise
          setIsOpen={setIsOpenEditModal}
          refetch={refetch}
          selectedEnterprise={selectedEnterprise}
          isView={isView}
        />
      </ModalContainer>

      <div className="my-2 p-4 px-6 w-full flex flex-col justify-between h-full">
        <div className="w-full flex flex-col gap-2">
          <>
            <div className="md:flex-row flex flex-col justify-between space-y-4 md:space-y-0 w-full items-center">
              <div>
                <p className="text-2xl font-semibold text-[#3170B5]">
                  List of Enterprises
                </p>
                <p className="text-xs text-[#9898A3] max-w-md">
                  Here is the list of all the enterprises created.
                </p>
              </div>

              <button
                onClick={() => setIsOpennRegisterModal(true)}
                className="bg-[#3170B5] hover:bg-[#3170B5]/60 text-white px-4 py-2 rounded-md"
              >
                Add New Enterprise
              </button>
            </div>

            <ShadeFilterTab />

            <div className="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
              <div className="w-full gap-4 h-[68vh] overflow-y-scroll py-1 pb-3 relative rounded-lg">
                <EnterpriseTable
                  isLoading={loading}
                  enterpriseList={loading ? [] : data}
                  setIsOpenEditModal={setIsOpenEditModal}
                  setSelectedEnterpise={setSelectedEnterpise}
                  setIsView={setIsView}
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
          loading ? 0 : data?.enterprise_enterprises_aggregate?.aggregate?.count
        }
        refetch={refetch}
      />
    </>
  );
};

export default Enterprise;

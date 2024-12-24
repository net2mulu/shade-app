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
import SearchInput from "../../components/molecule/TableSearch";
export const TabStatusOptions = ["all", "created", "assigned"];

export const getQuery = (selectedTab, searchText) => {
  switch (selectedTab) {
    case TabStatusOptions[1]:
      return {
        query: GET_UNASSIGNED_SHEDS,
        where: searchText
          ? {
              _and: [
                {
                  assigned_sheds_aggregate: {
                    count: { predicate: { _eq: 0 } },
                  },
                },
                { block_no: { _ilike: "%" + searchText + "%" } },
              ],
            }
          : {
              assigned_sheds_aggregate: {
                count: { predicate: { _eq: 0 } },
              },
            },
      };

    case TabStatusOptions[2]:
      return {
        query: GET_ASSIGNED_SHEDS,
        where: searchText
          ? {
              _and: [
                {
                  assigned_sheds_aggregate: {
                    count: { predicate: { _gt: 0 } },
                  },
                },
                { block_no: { _ilike: "%" + searchText + "%" } },
              ],
            }
          : {
              assigned_sheds_aggregate: {
                count: { predicate: { _gt: 0 } },
              },
            },
      };

    default:
      return {
        query: GET_SHEDS,
        where: searchText
          ? { block_no: { _ilike: "%" + searchText + "%" } }
          : {},
      };
  }
};

const Shade = () => {
  const [isOpenRegisterModal, setIsOpennRegisterModal] = useState(false);
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isView, setIsView] = useState(false);

  const [selectedShade, setSelectedShade] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [tabStatus, setTabStatus] = useState(TabStatusOptions[0]);

  const [pagination, setPagination] = useState({
    perPage: 10,
    currentPage: 0,
    offset: 0,
  });

  const client = useMemo(() => getTempClient(), []);
  const { loading, data, refetch } = useQuery(
    getQuery(tabStatus, searchText).query,
    {
      variables: {
        limit: pagination.perPage,
        offset: pagination.offset,
        where: getQuery(tabStatus, searchText).where,
      },
      client: client,
    }
  );

  return (
    <>
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
            <article className="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
              <section className="bg-white w-full gap-4 h-[62vh] py-2 overflow-y-scroll pb-3 relative rounded-lg">
                <div className="flex justify-end items-center">
                  <SearchInput
                    searchQuery={searchText}
                    setSearchQuery={setSearchText}
                    placeholder="Search by block no"
                  />
                </div>

                <ShadeTable
                  isLoading={loading}
                  shadsList={loading ? [] : data}
                  tabStatus={tabStatus}
                  setIsOpenAssignModal={setIsOpenAssignModal}
                  setSelectedShade={setSelectedShade}
                  setIsOpenEditModal={setIsOpenEditModal}
                  setIsView={setIsView}
                />
              </section>
            </article>
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

      <ModalContainer
        isOpen={isOpenRegisterModal}
        setIsOpen={setIsOpennRegisterModal}
        refetch={refetch}
        title="Register Shade"
        afterClose={() => setSelectedShade(null)}
      >
        <RegisterShade
          setIsOpen={setIsOpennRegisterModal}
          refetch={refetch}
          selectedShade={null}
        />
      </ModalContainer>

      <ModalContainer
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        refetch={refetch}
        title={isView ? "Shade Info" : "Edit Shade"}
        afterClose={() => {
          setIsView(false);
          setSelectedShade(null);
        }}
      >
        <RegisterShade
          setIsOpen={setIsOpenEditModal}
          refetch={refetch}
          selectedShade={selectedShade}
          isView={isView}
        />
      </ModalContainer>

      <ModalContainer
        isOpen={isOpenAssignModal}
        setIsOpen={setIsOpenAssignModal}
        refetch={refetch}
        title="Assign Shades for Enterprises"
        afterClose={() => setSelectedShade(null)}
      >
        <AssignShade
          selectedShade={selectedShade}
          setIsOpen={setIsOpenAssignModal}
          refetch={refetch}
        />
      </ModalContainer>
    </>
  );
};

export default Shade;

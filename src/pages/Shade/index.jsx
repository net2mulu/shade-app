import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import ShadeFilterTab from "../../components/Shade/ShadeFilterTab";
import ShadeTable from "../../components/Shade/ShadeTable";
import { ShadeContext } from "../../context/ShadeContext";

const Shade = () => {
  const { itemsPerPage, total, handlePageClick } = useContext(ShadeContext);

  return (
    <>
      <div className="-mt-2 w-full flex flex-col">
        <div className="w-full flex flex-col gap-2">
          <>
            <div className="md:flex-row flex flex-col justify-between space-y-4 md:space-y-0 w-full items-center">
              <div>
                <p className="text-2xl font-semibold text-emdmsPrimary">
                  Partnership Management
                </p>
                <p className="text-xs text-N70 max-w-md">
                  Here is the list of all the approved partners you have from
                  ethiopia, you can get their details or request partnership
                  cancelation.
                </p>
              </div>

              <div className="relative w-1/2 flex justify-end">
                {/* TODO: When needed initiate partnerships from here */}
              </div>
            </div>

            <ShadeFilterTab />
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center">
              <div className="w-full gap-4 h-[60vh] overflow-y-auto  py-1 pb-3 relative rounded-lg">
                <ShadeTable data={[]} />
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
              nextClassName="border border-[#005656]  space-x-2 items-center  flex text-[#005656] px-4 py-1 ml-2"
              // onPageChange={handlePageClick}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={Math.ceil(total / itemsPerPage)}
              previousLabel="< Previous"
              previousClassName="border border-[#005656]  space-x-2 items-center  flex text-[#005656] px-4 py-1 mr-2"
              containerClassName=""
              className="flex justify-center text-emdmsPrimary  items-end md:justify-end  mr-5 mb-4"
              pageLinkClassName="px-3 py-2 "
              pageClassName="bg-white py-1 rounded-md border border-[#005656] mx-1"
              activeLinkClassName="text-white w-full rounded-md px-2 bg-emdmsPrimary"
              activeClassName="bg-emdmsPrimary text-white"
            />
          }
        </div>
      </div>
    </>
  );
};

export default Shade;

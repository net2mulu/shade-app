import React, { useState, useContext, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ShadeFilterTab from "../../components/Shade/ShadeFilterTab";
import ShadeTable from "../../components/Shade/ShadeTable";
import { ShadeContext } from "../../context/ShadeContext";
import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { BsBuildings } from "react-icons/bs";
import RegisterShade from "../../components/Shade/RegisterShade";

const Shade = () => {
  const { itemsPerPage, total, handlePageClick } = useContext(ShadeContext);
  let [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(true);
  }, [isOpen]);

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <DialogBackdrop className=" fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="overflow-auto w-[60%] max-h-[80vh] rounded-xl bg-white p-8  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="flex items-center gap-2 justify-start text-2xl font-medium"
              >
                <BsBuildings className="text-[#3170B5] text-3xl  rounded-md font-bold" />
                Register Shade
              </DialogTitle>
              <RegisterShade />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
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
                onClick={() => setIsOpen(true)}
                className="bg-[#3170B5] hover:bg-[#3170B5]/60 text-white px-4 py-2 rounded-md"
              >
                Add New Shade
              </button>
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

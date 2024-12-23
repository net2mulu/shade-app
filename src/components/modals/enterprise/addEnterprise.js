import React from "react";
import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { BsBuildings } from "react-icons/bs";
import RegisterShade from "../../../../components/Shade/RegisterShade";
import { IoClose } from "react-icons/io5";
const AddEnterprise = ({
  isOpenRegisterModal,
  setIsOpennRegisterModal,
  refetch,
}) => {
  return (
    <Dialog
      open={isOpenRegisterModal}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={() => setIsOpennRegisterModal(false)}
    >
      <DialogBackdrop className=" fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="overflow-auto w-[75%] max-h-[90vh] px-16 py-10 rounded-xl bg-white p-8  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-full flex justify-end ">
              <button
                type="button"
                className="text-white bg-red-500 hover:opacity-70"
                onClick={() => setIsOpennRegisterModal(false)}
              >
                <IoClose />
              </button>
            </div>
            <DialogTitle
              as="h2"
              className="flex items-center gap-2 justify-start text-2xl font-semibold font-inter text-[#16192C]"
            >
              <p className="p-1 border rounded-md border-[#A3A0AE] mr-1">
                <BsBuildings className="text-[#A3A0AE] text-3xl w-5 h-5  rounded-md font-bold" />
              </p>
              Register Shade
            </DialogTitle>
            <RegisterShade
              setIsOpen={setIsOpennRegisterModal}
              refetch={refetch}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddEnterprise;

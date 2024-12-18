import React from "react";
import {
  DialogBackdrop,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { BsBuildings } from "react-icons/bs";
import RegisterShade from "../../../../components/Shade/RegisterShade";
const AddShade = ({ isOpenRegisterModal, setIsOpennRegisterModal }) => {
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
            className="overflow-auto w-[70%] max-h-[80vh] rounded-xl bg-white p-8  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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
  );
};

export default AddShade;

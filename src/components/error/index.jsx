import toast from "react-hot-toast";
import { customHandleError } from "../../utils/methods/handleError";
import { useEffect } from "react";
import { IoReloadOutline } from "react-icons/io5";
const ErrorMsg = ({ error, message, refetch }) => {
  useEffect(() => {
    customHandleError(error, toast);
  }, []);

  return (
    <article className="w-full my-10 text-center">
      {error && <p>{message ? message : "An unexpected error occurred!"}</p>}
      {error && <p className="text-sm mt-1">Please try again.</p>}
      {refetch && (
        <div className="mt-4 ">
          <button type="button" onClick={refetch}
          className="bg-gray-100 p-2 rounded-full ">
           <IoReloadOutline size={20} className="text-primary hover:text-black"/>
          </button>
        </div>
      )}
    </article>
  );
};

export default ErrorMsg;

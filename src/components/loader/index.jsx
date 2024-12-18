import ClipLoader from "react-spinners/ClipLoader";
import { twMerge } from "tailwind-merge";

const Loader = ({ containerClass, iconColor, iconSize }) => {
  return (
    <div className={twMerge("flex justify-center items-center w-full py-36", containerClass)}>
      <ClipLoader
        color={iconColor ?? "black"}
        loading={true}
        size={iconSize}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;

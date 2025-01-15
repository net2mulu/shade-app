import { useMutation, useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { GET_ENTERPRISES } from "../../../apollo/shades/query";
import { getTempClient } from "../../../apollo/client";
import Loader from "../../loader";
import { ASSIGN_SHED } from "../../../apollo/shades/mutation";
import toast from "react-hot-toast";
import { Button } from "@headlessui/react";
import { transformObject } from "../../../utils/methods/transferData";
import { ClipLoader } from "react-spinners";
import { customHandleError } from "../../../utils/methods/handleError";
import useCustomRefetch from "../../../hooks/useCustomRefetch";
import ErrorMsg from "../../error";

const AssignShade = ({ selectedShade, setIsOpen, refetch }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const updatedClient = useMemo(() => getTempClient(), []);

  const {
    loading: loadingEnterprises,
    data: dataEnterprises,
    error,
    refetch: enterpriseRefetch,
  } = useQuery(GET_ENTERPRISES, {
    skip: false,
    client: updatedClient,
  });

  const { handleRefetch, isRefetching, refetchError } =
    useCustomRefetch(enterpriseRefetch);

  const [assignShed, { loading: loadingSubmit }] = useMutation(ASSIGN_SHED, {
    onCompleted: () => {
      toast.success("Enterprise assigned successfully");
      refetch();
      setIsOpen(false);
    },
    onError: (err) => {
      customHandleError(err, toast);
    },
    client: updatedClient,
  });

  if (loadingEnterprises || isRefetching) {
    return <Loader />;
  }

  if (error || refetchError) {
    return <ErrorMsg error={error} message={null} refetch={handleRefetch} />;
  }

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("user_id") ?? null;

    if (selectedShade) {
      try {
        await assignShed({
          variables: {
            ...transformObject(data),
            shed_id: selectedShade.id,
            assigned_by_id: userId ?? "00000000-0000-0000-0000-000000000000",
          },
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <form
      className="my-3 flex flex-col gap-x-3 gap-y-6 items-start justify-start py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full">
        <label
          htmlFor="name"
          className="text-black text-base font-medium capitalize"
        >
          shade name
        </label>

        <input
          type="text"
          id="name"
          value={selectedShade?.name ?? ""}
          className={`w-full p-2 border mt-2 rounded-md capitalize focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]
     
          }`}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          htmlFor="enterprise_id"
          className="text-black text-base font-medium capitalize"
        >
          enterprise name <span className="text-red-400">*</span>
        </label>

        <Controller
          name="enterprise_id"
          control={control}
          rules={{ required: "Enterprise is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={dataEnterprises.enterprise_enterprises.map((item) => {
                return {
                  value: item.id,
                  label: item.enterprise[0].namejson.en,
                };
              })}
              placeholder="Select Enterprise"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: errors.enterprise_id
                    ? "red"
                    : state.isFocused
                    ? "#3170B5"
                    : "#CED4DB",
                  padding: ".5px",
                  marginTop: ".5rem",
                }),
              }}
            />
          )}
        />
        {errors.enterprise_id && (
          <span className="text-red-500 text-xs capitalize">
            * {errors.enterprise_id.message}
          </span>
        )}
      </div>

      <div className="flex justify-end items-center w-full mt-8">
        <Button
          type="submit"
          className="inline-flex items-center gap-2 w-32 justify-center rounded-md bg-[#3170B5] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
        >
          {loadingSubmit ? (
            <ClipLoader
              color={"white"}
              loading={true}
              size={16}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="py-2"
            />
          ) : (
            "Assign"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AssignShade;

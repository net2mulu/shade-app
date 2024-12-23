import React, { useMemo } from "react";
import Select from "react-select";

import { Controller, useForm } from "react-hook-form";
import { getTempClient } from "../../apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Loader from "../loader";
import { GET_ORGANIZATIONS } from "../../apollo/shades/query";
import { ADD_ENTERPRISE } from "../../apollo/shades/mutation";
import { transformObject } from "../../utils/methods/transferData";
import { boolOptions, boolOptionsString } from "../../utils/data";
import { Button } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

const AddEnterprsise = ({ setIsOpen, refetch }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const updatedClient = useMemo(() => getTempClient(), []);

  const [addEnterprise, { loading: loadingSubmit }] = useMutation(ADD_ENTERPRISE, {
    onCompleted: () => {
      toast.success("Enterprise added successfully");
      refetch();
      setIsOpen(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to add enterprise. Please try again.");
    },
    client: updatedClient,
  });

  const { loading: loadingEnterprises, data: dataEnterprises } = useQuery(
    GET_ORGANIZATIONS,
    {
      skip: false,
      client: updatedClient,
    }
  );

  if (loadingEnterprises) {
    return <Loader />;
  }

  const onSubmit = async (data) => {
      try {
        await addEnterprise({
          variables: {
            ...transformObject(data),
           
          },
        });
      } catch (error) {
        console.error("Error updating user:", error);
      }
  };

  const selectedPurpose = watch("used_for_intended_purpose");

  return (
    <form
      className="my-3 flex flex-col gap-3 items-start justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-[#3170B5] text-xl font-bold leading-4 mt-6">
        Enterprise registration form
      </h2>

      <article className="grid grid-cols-2 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-12 py-4 gap-8 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="organization_id"
            className="text-black text-base font-medium capitalize"
          >
            Organization <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ድርጅት</span>
          <Controller
            name="organization_id"
            control={control}
            rules={{ required: "Organization is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dataEnterprises?.organization_namespace?.organizations.map(
                  (item) => {
                    return { value: item.id, label: item?.namejson?.en ?? "" };
                  }
                )}
                placeholder="Select Organization"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.organization_id
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
          {errors.organization_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.organization_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="used_for_intended_purpose"
            className="text-black text-base font-medium capitalize"
          >
            Is area used for its intended purpose?
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            {" "}
            ማምረቻና መሸጫ ቦታው ለታለመለት ዓላማ ውሏል ?{" "}
          </span>
          <Controller
            name="used_for_intended_purpose"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptions}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.used_for_intended_purpose
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
          {errors.used_for_intended_purpose && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.used_for_intended_purpose.message}
            </span>
          )}
        </div>

        {selectedPurpose && selectedPurpose.value === false && (
          <div>
          <label
            htmlFor="reason_not_used_for_intended_purpose"
            className="text-black text-base font-medium capitalize"
          >
           Reason why the area is not used for its intended purpose
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm">
            {" "}
            የማምረቻና መሸጫ ቦታው ለታለመለት ዓላማ ያልዋለበት ምክንያት ይገለፅ{" "}
          </p>
            <input
              type="text"
              id="reason_not_used_for_intended_purpose"
              placeholder="..."
              {...register("reason_not_used_for_intended_purpose", selectedPurpose && selectedPurpose.value === false && { required: "Reason is required" })}
              className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
                errors.reason_not_used_for_intended_purpose ? "border-red-500" : "border-[#CED4DB]"
              }`}
            />
            {errors.reason_not_used_for_intended_purpose && (
              <span className="text-red-500 text-xs capitalize">
                * {errors.reason_not_used_for_intended_purpose.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="contract_transferred_time"
            className="text-black text-base font-medium capitalize"
          >
            contract transferred time <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">በውል የተላለፈበት ጊዜ</span>
          <input
            name="contract_transferred_time"
            type="date"
            id="contract_transferred_time"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("contract_transferred_time", {
              required: "Transfer date is required",
            })}
          />
          {errors.contract_transferred_time && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.contract_transferred_time.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="contract_expiration_time"
            className="text-black text-base font-medium capitalize"
          >
            Contract expiration time <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">በውል የሚያበቃበት ጊዜ</span>
          <input
            name="contract_expiration_time"
            type="date"
            id="contract_expiration_time"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("contract_expiration_time", {
              required: "Expiration date is required",
            })}
          />
          {errors.contract_expiration_time && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.contract_expiration_time.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="young_male"
            className="text-black text-base font-medium capitalize"
          >
            Young male?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወጣቶች ወ?</span>
          <Controller
            name="young_male"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.young_male
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
          {errors.young_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.young_male.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="young_female"
            className="text-black text-base font-medium capitalize"
          >
            Young Female?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወጣቶች ሴ?</span>
          <Controller
            name="young_female"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.young_female
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
          {errors.young_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.young_female.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="internally_displaced_male"
            className="text-black text-base font-medium capitalize"
          >
            Internally displaced male ?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">የሀገር ውስጥ ተፈናቃይ ወ?</span>
          <Controller
            name="internally_displaced_male"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.internally_displaced_male
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
          {errors.internally_displaced_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.internally_displaced_male.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="internally_displaced_female"
            className="text-black text-base font-medium capitalize"
          >
            Internally displaced Female?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">የሀገር ውስጥ ተፈናቃይ ሴ?</span>
          <Controller
            name="internally_displaced_female"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.internally_displaced_female
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
          {errors.internally_displaced_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.internally_displaced_female.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="people_with_disabilities_male"
            className="text-black text-base font-medium capitalize"
          >
            People with disabilities male?
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">አካል ጉዳተኞች ወ?</span>
          <Controller
            name="people_with_disabilities_male"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.people_with_disabilities_male
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
          {errors.people_with_disabilities_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.people_with_disabilities_male.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="people_with_disabilities_female"
            className="text-black text-base font-medium capitalize"
          >
            People with disabilities Female?
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">አካል ጉዳተኞች ሴ?</span>
          <Controller
            name="people_with_disabilities_female"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.people_with_disabilities_female
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
          {errors.people_with_disabilities_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.people_with_disabilities_female.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="returning_citizens_male"
            className="text-black text-base font-medium capitalize"
          >
            Returning citizens male?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ከስደት ተመላሽ ዜጎች ወ?</span>
          <Controller
            name="returning_citizens_male"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.returning_citizens_male
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
          {errors.returning_citizens_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.returning_citizens_male.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="returning_citizens_female"
            className="text-black text-base font-medium capitalize"
          >
            Returning citizens Female?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ከስደት ተመላሽ ዜጎች ሴ?</span>
          <Controller
            name="returning_citizens_female"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptionsString}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.returning_citizens_female
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
          {errors.returning_citizens_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.returning_citizens_female.message}
            </span>
          )}
        </div>
      </article>
      <div className="flex justify-end items-center w-full mt-4">
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
            "Add"
          )}
          
        </Button>
      </div>
    </form>
  );
};

export default AddEnterprsise;

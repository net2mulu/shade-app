import React, { useMemo } from "react";
import Select from "react-select";

import { Controller, useForm } from "react-hook-form";
import { getTempClient } from "../../apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Loader from "../loader";
import { GET_ORGANIZATIONS } from "../../apollo/shades/query";
import {
  ADD_ENTERPRISE,
  UPDATE_ENTERPRISE,
} from "../../apollo/shades/mutation";
import { transformObject } from "../../utils/methods/transferData";
import { boolOptions } from "../../utils/data";
import { Button } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

const AddEnterprsise = ({ setIsOpen, refetch, selectedEnterprise, isView }) => {
  console.log(selectedEnterprise);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm(
    selectedEnterprise
      ? {
          defaultValues: {
            organization_id: {
              label: selectedEnterprise?.enterprise[0]?.namejson?.en ?? "",
              value: selectedEnterprise?.enterprise[0]?.id ?? null,
            },
            used_for_intended_purpose: {
              label: selectedEnterprise?.used_for_intended_purpose
                ? "Yes"
                : "No",
              value: selectedEnterprise?.used_for_intended_purpose,
            },
            ...(selectedEnterprise?.reason_not_used_for_intended_purpose && {
              reason_not_used_for_intended_purpose:
                selectedEnterprise?.reason_not_used_for_intended_purpose ?? "",
            }),
            contract_transferred_time:
              selectedEnterprise?.contract_transferred_time ?? "",
            contract_expiration_time:
              selectedEnterprise?.contract_expiration_time ?? "",
            young_male: selectedEnterprise?.young_male ?? "",
            young_female: selectedEnterprise?.young_female ?? "",
            internally_displaced_male:
              selectedEnterprise?.internally_displaced_male ?? "",
            internally_displaced_female:
              selectedEnterprise?.internally_displaced_female ?? "",
            people_with_disabilities_male:
              selectedEnterprise?.people_with_disabilities_male ?? "",
            people_with_disabilities_female:
              selectedEnterprise?.people_with_disabilities_female ?? "",
            returning_citizens_male:
              selectedEnterprise?.returning_citizens_male ?? "",
            returning_citizens_female:
              selectedEnterprise?.returning_citizens_female ?? "",
          },
        }
      : {}
  );

  const updatedClient = useMemo(() => getTempClient(), []);

  const [addEnterprise, { loading: loadingSubmit }] = useMutation(
    ADD_ENTERPRISE,
    {
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
    }
  );

  const [updateEnterprise, { loading: loadingEditSubmit }] = useMutation(
    UPDATE_ENTERPRISE,
    {
      onCompleted: () => {
        toast.success("Enterprise updated successfully");
        refetch();
        setIsOpen(false);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to update enterprise. Please try again.");
      },
      client: updatedClient,
    }
  );

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
      selectedEnterprise
        ? await updateEnterprise({
            variables: {
              ...transformObject(data),
              enterprise_id: selectedEnterprise.id,
            },
          })
        : await addEnterprise({
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
        {selectedEnterprise
          ? isView
            ? "Enterprise details viewer"
            : "Update enterprise infomation form"
          : "Enterprise registration form"}
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
                isDisabled={isView}
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
                isDisabled={isView}
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
              disabled={isView}
              placeholder="Write reason... "
              {...register(
                "reason_not_used_for_intended_purpose",
                selectedPurpose &&
                  selectedPurpose.value === false && {
                    required: "Reason is required",
                  }
              )}
              className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
                errors.reason_not_used_for_intended_purpose
                  ? "border-red-500"
                  : "border-[#CED4DB]"
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
            disabled={isView}
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
            disabled={isView}
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

        <div>
          <label
            htmlFor="young_male"
            className="text-black text-base font-medium capitalize"
          >
            Young male
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> ወጣቶች ወ</p>
          <input
            type="number"
            id="young_male"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "young_male",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.young_male ? "border-red-500" : "border-[#CED4DB]"
            }`}
          />
          {errors.young_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.young_male.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="young_female"
            className="text-black text-base font-medium capitalize"
          >
            Young Female
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> ወጣቶች ሴ </p>
          <input
            type="number"
            id="young_female"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "young_female",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.young_female ? "border-red-500" : "border-[#CED4DB]"
            }`}
          />
          {errors.young_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.young_female.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="internally_displaced_male"
            className="text-black text-base font-medium capitalize"
          >
            Internally displaced male
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> የሀገር ውስጥ ተፈናቃይ ወ </p>
          <input
            type="number"
            id="internally_displaced_male"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "internally_displaced_male",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.internally_displaced_male
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.internally_displaced_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.internally_displaced_male.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="internally_displaced_female"
            className="text-black text-base font-medium capitalize"
          >
            Internally displaced Female
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> የሀገር ውስጥ ተፈናቃይ ሴ </p>
          <input
            type="number"
            id="internally_displaced_female"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "internally_displaced_female",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.internally_displaced_female
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.internally_displaced_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.internally_displaced_female.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="people_with_disabilities_male"
            className="text-black text-base font-medium capitalize"
          >
            People with disabilities male
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> አካል ጉዳተኞች ወ </p>
          <input
            type="number"
            id="people_with_disabilities_male"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "people_with_disabilities_male",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.people_with_disabilities_male
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.people_with_disabilities_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.people_with_disabilities_male.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="people_with_disabilities_female"
            className="text-black text-base font-medium capitalize"
          >
            People with disabilities Female
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> አካል ጉዳተኞች ሴ </p>
          <input
            type="number"
            id="people_with_disabilities_female"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "people_with_disabilities_female",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Reason is required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.people_with_disabilities_female
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.people_with_disabilities_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.people_with_disabilities_female.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="returning_citizens_male"
            className="text-black text-base font-medium capitalize"
          >
            Returning citizens male
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> ከስደት ተመላሽ ዜጎች ወ </p>
          <input
            type="number"
            id="returning_citizens_male"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "returning_citizens_male",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Reason is required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.returning_citizens_male
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.returning_citizens_male && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.returning_citizens_male.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="returning_citizens_female"
            className="text-black text-base font-medium capitalize"
          >
            Returning citizens Female
            <span className="text-red-400">*</span>
          </label>
          <p className="text-[#CBCBCB] text-sm"> ከስደት ተመላሽ ዜጎች ሴ </p>
          <input
            type="number"
            id="returning_citizens_female"
            disabled={isView}
            placeholder="Enter amount"
            {...register(
              "returning_citizens_female",
              selectedPurpose &&
                selectedPurpose.value === false && {
                  required: "Reason is required",
                }
            )}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.returning_citizens_female
                ? "border-red-500"
                : "border-[#CED4DB]"
            }`}
          />
          {errors.returning_citizens_female && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.returning_citizens_female.message}
            </span>
          )}
        </div>
      </article>
      {!isView && (
        <div className="flex justify-end items-center w-full mt-4">
          <Button
            type="submit"
            className="inline-flex items-center gap-2 w-32 justify-center rounded-md bg-[#3170B5] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
          >
            {loadingSubmit || loadingEditSubmit ? (
              <ClipLoader
                color={"white"}
                loading={true}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="py-2"
              />
            ) : selectedEnterprise ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default AddEnterprsise;

import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@headlessui/react";
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { getTempClient, resetClient } from "../../apollo/client";
import {
  GET_CITIES,
  GET_KEBELES,
  GET_REGIONS,
  GET_SECTORS,
  GET_SERVICES_TYPES,
  GET_BUILT_BY,
  GET_ZONES,
  GET_SHED_TYPES,
  GET_CONSTRUCTION_LEVELS,
  GET_CONSTRUCTION_TYPES,
  GET_CONSTRUCTION_NOT_TRANSFERRED_REASON,
  GET_CONSTRUCTION_STOPPED_REASON,
  GET_FLOORS,
} from "../../apollo/base_data/query";
import Loader from "../loader";
import { boolOptions } from "../../utils/data";
import { INSERT_SHED, UPDATE_SHED } from "../../apollo/shades/mutation";
import toast from "react-hot-toast";
import { transformObject } from "../../utils/methods/transferData";
import { GET_SHEDS } from "../../apollo/shades/query";
import { ClipLoader } from "react-spinners";

function handleTheme(theme) {
  return {
    ...theme,
    borderRadius: "5px",
    zIndex: 9999,
    colors: {
      ...theme.colors,
      primary25: "#CED4DB",
      primary: "#CED4DB",
      neutral50: "#CED4DB",
      neutral80: "#CED4DB",
    },
  };
}

const RegisterShade = ({ setIsOpen, refetch, selectedShade, isView }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm(
    selectedShade
      ? {
          defaultValues: {
            name: selectedShade?.name.en ?? "",
            block_no: selectedShade?.block_no ?? "",
            region_id: {
              label: selectedShade?.region?.namejson?.en,
              value: selectedShade?.region?.id,
            },
            city_id: {
              label: selectedShade?.city?.namejson?.en,
              value: selectedShade?.city?.id,
            },
            zone_id: {
              label: selectedShade?.zone?.namejson?.en,
              value: selectedShade?.zone?.id,
            },
            kebele_id: {
              label: selectedShade?.kebele?.namejson?.en,
              value: selectedShade?.kebele?.id,
            },
            production_area: selectedShade?.production_area ?? "",
            manufacturing_place: selectedShade?.manufacturing_place ?? "",
            number_of_enterprises: selectedShade?.number_of_enterprises ?? "",
            sector_id: {
              label: selectedShade?.sector?.namejson?.en,
              value: selectedShade?.sector?.id,
            },
            service_type_id: {
              label: selectedShade?.service_type?.name_json?.en,
              value: selectedShade?.service_type?.id,
            },
            built_by_id: {
              label: selectedShade?.built_by?.name_json?.en,
              value: selectedShade?.built_by?.id,
            },
            construction_type_id: {
              label: selectedShade?.construction_type?.name_json?.en,
              value: selectedShade?.construction_type?.id,
            },
            construction_level_id: {
              label: selectedShade?.construction_level?.name_json?.en,
              value: selectedShade?.construction_level?.id,
            },
            shed_type_id: {
              label: selectedShade?.shed_type?.name_json?.en,
              value: selectedShade?.shed_type?.id,
            },
            have_water: {
              label: selectedShade?.have_water ? "Yes" : "No",
              value: selectedShade?.have_water ? true : false,
            },
            have_toilet: {
              label: selectedShade?.have_toilet ? "Yes" : "No",
              value: selectedShade?.have_toilet ? true : false,
            },
            have_electricity: {
              label: selectedShade?.have_electricity ? "Yes" : "No",
              value: selectedShade?.have_electricity ? true : false,
            },
            is_suitable_for_disabled_people: {
              label: selectedShade?.is_suitable_for_disabled_people
                ? "Yes"
                : "No",
              value: selectedShade?.is_suitable_for_disabled_people
                ? true
                : false,
            },
            number_of_floors_id: {
              label: selectedShade?.number_of_floor?.name_json?.en,
              value: selectedShade?.number_of_floor?.id,
            },
            construction_status: selectedShade?.construction_status ?? "",
            total_cost_of_production:
              selectedShade?.total_cost_of_production ?? "",
            construction_work_started_date:
              selectedShade?.construction_work_started_date ?? "",
            ...(selectedShade?.construction_completed_date && {
              construction_completed_date:
                selectedShade.construction_completed_date,
            }),
            ...(selectedShade?.construction_stopped_date && {
              construction_stopped_date:
                selectedShade.construction_stopped_date,
            }),
            ...(selectedShade?.construction_stopped_reason && {
              construction_stopped_reason_id: {
                label: selectedShade?.construction_stopped_reason.name_json.en,
                value: selectedShade?.construction_stopped_reason?.id,
              },
            }),
            ...(selectedShade?.not_transferred_reason && {
              not_transferred_reason_id: {
                label: selectedShade?.not_transferred_reason.name_json.en,
                value: selectedShade?.not_transferred_reason?.id,
              },
            }),
          },
        }
      : {}
  );

  const client = useMemo(() => resetClient(), []);
  const updatedClient = useMemo(() => getTempClient(), []);

  const [createShed, { loading: loadingSubmit }] = useMutation(INSERT_SHED, {
    onCompleted: () => {
      toast.success("Shed added successfully");
      refetch();
      setIsOpen(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to new shed. Please try again.");
    },
    refetchQueries: [
      {
        query: GET_SHEDS,
        variables: { limit: 20 },
      },
    ],
    client: updatedClient,
  });

  const [editShed, { loading: loadingEditSubmit }] = useMutation(UPDATE_SHED, {
    onCompleted: () => {
      toast.success("Shed updated successfully");
      refetch();
      setIsOpen(false);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update shed. Please try again.");
    },
    refetchQueries: [
      {
        query: GET_SHEDS,
        variables: { limit: 20 },
      },
    ],
    client: updatedClient,
  });

  const {
    loading: loadingKebele,
    data: dataKebele,
    error: errorKebele,
  } = useQuery(GET_KEBELES, {
    variables: {
      limit: 10,
    },
    skip: false,
    client,
  });

  const {
    loading: loadingCity,
    data: dataCity,
    error: errorCity,
  } = useQuery(GET_CITIES, {
    skip: false,
    client,
  });

  const {
    loading: loadingZone,
    data: dataZone,
    error: errorZone,
  } = useQuery(GET_ZONES, {
    variables: {
      limit: 10,
    },
    skip: false,
    client,
  });

  const {
    loading: loadingRegion,
    data: dataRegion,
    error: errorRegion,
  } = useQuery(GET_REGIONS, {
    skip: false,
    client,
  });

  const {
    loading: loadingSector,
    data: dataSector,
    error: errorSector,
  } = useQuery(GET_SECTORS, {
    skip: false,
    client,
  });

  const {
    loading: loadingService,
    data: dataService,
    error: errorService,
  } = useQuery(GET_SERVICES_TYPES, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingShed,
    data: dataShed,
    error: errorShed,
  } = useQuery(GET_SHED_TYPES, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingBuiltBy,
    data: dataBuiltBy,
    error: errorBuiltBy,
  } = useQuery(GET_BUILT_BY, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingConLevels,
    data: dataConLevels,
    error: errorConLevels,
  } = useQuery(GET_CONSTRUCTION_LEVELS, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingConTypes,
    data: dataConTypes,
    error: errorConTypes,
  } = useQuery(GET_CONSTRUCTION_TYPES, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingReasonTrans,
    data: dataReasonTrans,
    error: errorReasonTrans,
  } = useQuery(GET_CONSTRUCTION_NOT_TRANSFERRED_REASON, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingReasonStop,
    data: dataReasonStop,
    error: errorReasonStop,
  } = useQuery(GET_CONSTRUCTION_STOPPED_REASON, {
    skip: false,
    client: updatedClient,
  });

  const {
    loading: loadingFloorNo,
    data: dataFloorNo,
    error: errorFloorNo,
  } = useQuery(GET_FLOORS, {
    skip: false,
    client: updatedClient,
  });

  if (
    loadingKebele ||
    loadingCity ||
    loadingZone ||
    loadingRegion ||
    loadingService ||
    loadingSector ||
    loadingShed ||
    loadingBuiltBy ||
    loadingConLevels ||
    loadingConTypes ||
    loadingReasonTrans ||
    loadingReasonStop ||
    loadingFloorNo
  ) {
    return <Loader />;
  }

  if (
    errorKebele ||
    errorCity ||
    errorZone ||
    errorRegion ||
    errorService ||
    errorSector ||
    errorShed ||
    errorBuiltBy ||
    errorConLevels ||
    errorConTypes ||
    errorReasonTrans ||
    errorReasonStop ||
    errorFloorNo
  ) {
    return (
      <div className="my-6 text-center text-red-500">
        <p>Error fetching data</p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const parsedData = transformObject(data);

    const leftFields = {};

    if (!data?.shed_type_id) {
      leftFields["shed_type_id"] = "47fc7455-aa4e-42ca-9079-774075f596f2";
    }

    if (!data?.number_of_floors_id) {
      leftFields["number_of_floors_id"] =
        "02e1cc4f-3a4f-423e-a02e-9d638400ad18";
    }

    if (!data?.construction_completed_date) {
      leftFields["construction_completed_date"] = "2024-12-20";
    }

    if (!data?.construction_stopped_date) {
      leftFields["construction_stopped_date"] = "2024-12-20";
    }

    if (!data?.created_by_id) {
      leftFields["created_by_id"] = "00000000-0000-0000-0000-000000000000";
    }

    try {
      selectedShade
        ? await editShed({
            variables: {
              ...parsedData,
              ...leftFields,
              total_cost_of_production:
                data.total_cost_of_production.toString(),
              name: { en: data.name },
              shedId: selectedShade.id,
            },
          })
        : await createShed({
            variables: {
              ...parsedData,
              ...leftFields,
              total_cost_of_production:
                data.total_cost_of_production.toString(),
              name: { en: data.name },
            },
          });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const selectedConstructionType = watch("construction_type_id");
  const selectedServiceType = watch("service_type_id");
  const selectedConstructionLevel = watch("construction_level_id");

  return (
    <form
      className="my-3 flex flex-col gap-3 items-start justify-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-[#3170B5] text-xl font-bold leading-4 mt-6">
        የማምረቻና የመሸጫ ቦታዎች ዝርዝር መረጃ መሰብሰቢያ ቅጽ
      </h2>
      <p className="text-sm capitalize w-4/5 text-[#425466]">
        Shade registration form
      </p>
      <div className="grid grid-cols-2 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-12 py-4 gap-8 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-black text-base font-medium capitalize"
          >
            Manufacturing/Selling area site specific name{" "}
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው የተገነባበት አካባቢ ሳይት/ ልዩ መጠሪያ ስም
          </span>
          <input
            type="text"
            id="name"
            disabled={isView}
            placeholder="eg. megenagna"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.name ? "border-red-500" : "border-[#CED4DB]"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="block_no"
            className="text-black text-base font-medium capitalize"
          >
            Manufacturing/Sales Place/Block No{" "}
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው ስም/ብሎክ ቁጥር
          </span>
          <input
            type="text"
            id="block_no"
            disabled={isView}
            placeholder="eg. block 14"
            {...register("block_no", { required: "Block number is required" })}
            className={`w-full p-2 border mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5] ${
              errors.block_no ? "border-red-500" : "border-[#CED4DB]"
            }`}
          />
          {errors.block_no && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.block_no.message}
            </span>
          )}
        </div>
      </div>

      <h2 className="text-[#3170B5] text-xl font-bold leading-4 mt-6">አድራሻ</h2>
      <p className="text-sm capitalize w-3/4 text-[#425466]">
        Address Information
      </p>
      <div className="grid grid-cols-3 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-12 py-4 gap-8 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="region_id"
            className="text-black text-base font-medium capitalize"
          >
            Region <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ክልል</span>
          <Controller
            name="region_id"
            control={control}
            disabled={isView}
            rules={{ required: "Region is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dataRegion.base_regions.map((item) => {
                  return { value: item.id, label: item.namejson.en };
                })}
                placeholder="Select Region"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.region_id
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
          {errors.region_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.region_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="zone_id"
            className="text-black text-base font-medium capitalize"
          >
            Zone/ Division <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ዞን/ክፍለ ከተማ</span>
          <Controller
            name="zone_id"
            control={control}
            rules={{ required: "Zone is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataZone.base_zone.map((item) => {
                  return { value: item.id, label: item.namejson.en };
                })}
                placeholder="Select Zone"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.zone_id
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
          {errors.zone_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.zone_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="city_id"
            className="text-black text-base font-medium capitalize"
          >
            City <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወረዳ/ከተማ አስተዳደር</span>
          <Controller
            name="city_id"
            control={control}
            rules={{ required: "City is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataCity.base_cities.map((item) => {
                  return { value: item.id, label: item.namejson.en };
                })}
                placeholder="Select City"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.city_id
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
          {errors.city_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.city_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="kebele_id"
            className="text-black text-base font-medium capitalize"
          >
            Kebele <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ቀበሌ</span>
          <Controller
            name="kebele_id"
            control={control}
            rules={{ required: "Kebele is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataKebele.base_kebele.map((item) => {
                  return { value: item.id, label: item.namejson.en };
                })}
                placeholder="Select Kebele"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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
          {errors.kebele_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.kebele_id.message}
            </span>
          )}
        </div>
      </div>

      <h2 className="text-[#3170B5] text-xl font-bold">...</h2>
      <div className="grid grid-cols-3 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-12 py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="production_area"
            className="text-black text-base font-medium capitalize"
          >
            Area of production <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው ስፋት በካ.ሜ
          </span>
          <input
            name="production_area"
            type="text"
            disabled={isView}
            placeholder="eg. 5 * 5"
            id="production_area"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("production_area", {
              required: "Area is required",
            })}
          />
          {errors.production_area && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.production_area.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="manufacturing_place"
            className="text-black text-base font-medium capitalize"
          >
            Manufacturing Place <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            ማምረቻ/ መሸጫው የተገነባበት ቦታ የሚገኝበት
          </span>
          <input
            name="manufacturing_place"
            type="text"
            disabled={isView}
            placeholder="address"
            id="manufacturing_place"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("manufacturing_place", {
              required: "Manufacturing place is required",
            })}
          />
          {errors.manufacturing_place && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.manufacturing_place.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="number_of_enterprises"
            className="text-black text-base font-medium capitalize"
          >
            Number of enterprises<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            ቦታው ሊያስተናግድ የሚችለው የኢንተርፕራይዞች ብዛት
          </span>
          <input
            name="number_of_enterprises"
            type="number"
            disabled={isView}
            placeholder="address"
            id="number_of_enterprises"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("number_of_enterprises", {
              required: "No. of enterprises is required",
            })}
          />
          {errors.number_of_enterprises && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.number_of_enterprises.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="have_water"
            className="text-black text-base font-medium capitalize"
          >
            Does it have water? <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ዉሃ አለው ?</span>
          <Controller
            name="have_water"
            control={control}
            rules={{ required: "Required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptions}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.have_water
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
          {errors.have_water && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.have_water.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="have_electricity"
            className="text-black text-base font-medium capitalize"
          >
            Does it have electricity?<span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ኤሌክትርሲቲ አለው?</span>
          <Controller
            name="have_electricity"
            control={control}
            rules={{ required: "Required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptions}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.have_electricity
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
          {errors.have_electricity && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.have_electricity.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="have_toilet"
            className="text-black text-base font-medium capitalize"
          >
            Does it have a toilet? <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">መፀዳጃ ቤት አለው?</span>
          <Controller
            name="have_toilet"
            control={control}
            rules={{ required: "Required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptions}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.have_toilet
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
          {errors.have_toilet && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.have_toilet.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="is_suitable_for_disabled_people"
            className="text-black text-base font-medium capitalize"
          >
            Is it suitable for disabled people?{" "}
            <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            የማምረቻ/ የመሸጫ ቦታው ለአካል ጉዳተኞች አመቺ ነው ?
          </span>
          <Controller
            name="is_suitable_for_disabled_people"
            control={control}
            rules={{ required: "Required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={boolOptions}
                placeholder="Select option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.is_suitable_for_disabled_people
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
          {errors.is_suitable_for_disabled_people && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.is_suitable_for_disabled_people.message}
            </span>
          )}
        </div>
      </div>
      <h2 className="text-[#3170B5] text-xl font-bold">...</h2>

      <div className="grid grid-cols-3 border-x-none border-t-none border-b border-[#CBCBCB]/50 pb-12 py-4  gap-8 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="sector_id"
            className="text-black text-base font-medium capitalize"
          >
            Sector Type <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            ቦታው አገልግሎት እንዲሰጥ የተዘጋጀበት ዋና ዘርፍ ዓይነት
          </span>
          <Controller
            name="sector_id"
            control={control}
            rules={{ required: "Sector Type is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataSector.base_sectors.map((item) => {
                  return { value: item.id, label: item.namejson.en };
                })}
                placeholder="Select Sector"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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

          {errors.sector_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.sector_id.message}
            </span>
          )}
        </div>

        {/* Service Type */}
        <div className="flex flex-col">
          <label
            htmlFor="service_type_id"
            className="text-black text-base font-medium capitalize"
          >
            Service Type <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ቦታው የሚሰጠው አገልግሎት </span>
          <Controller
            name="service_type_id"
            control={control}
            rules={{ required: "Service Type is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataService.base_service_types.map((item) => {
                  return { value: item.id, label: item.name_json.en };
                })}
                placeholder="Select Service"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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

          {errors.service_type_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.service_type_id.message}
            </span>
          )}
        </div>

        {selectedServiceType?.label.toLowerCase() === "shed" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="shed_type_id"
              className="text-black text-base font-medium capitalize"
            >
              Shade Type <span className="text-red-400">*</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">የሼዱ ዓይነት</span>
            <Controller
              name="shed_type_id"
              control={control}
              disabled={isView}
              rules={{
                required:
                  selectedServiceType?.label.toLowerCase() === "shed"
                    ? "Shade Type is required"
                    : false,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dataShed.base_shed_types.map((item) => {
                    return { value: item.id, label: item.name_json.en };
                  })}
                  placeholder="Select Shade Type"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: errors.kebele_id
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

            {errors.shed_type_id && (
              <span className="text-red-500 text-xs capitalize">
                * {errors.shed_type_id.message}
              </span>
            )}
          </div>
        )}

        {/* Built By */}
        <div className="flex flex-col">
          <label
            htmlFor="built_by_id"
            className="text-black text-base font-medium capitalize"
          >
            Built By <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">ወረዳ/ከተማ አስተዳደር</span>
          <Controller
            name="built_by_id"
            control={control}
            rules={{ required: "Built By is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataBuiltBy.base_built_by.map((item) => {
                  return { value: item.id, label: item.name_json.en };
                })}
                placeholder="Select Option"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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

          {errors.built_by_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.built_by_id.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="construction_type_id"
            className="text-black text-base font-medium capitalize"
          >
            Construction Type <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">የቦታው ግንባታው ዓይነት</span>

          <Controller
            name="construction_type_id"
            control={control}
            rules={{ required: "construction_type_id" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataConTypes.base_construction_types.map((item) => {
                  return { value: item.id, label: item.name_json.en };
                })}
                placeholder="Select Construction Type"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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

          {errors.construction_type_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.construction_type_id.message}
            </span>
          )}
        </div>

        {selectedConstructionType?.label.toLowerCase() === "building" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="number_of_floors_id"
              className="text-black text-base font-medium capitalize"
            >
              Number of Floors <span className="text-red-400">*</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">የወለል ብዛት</span>

            <Controller
              name="number_of_floors_id"
              control={control}
              rules={{
                required:
                  selectedConstructionType?.label.toLowerCase() === "building"
                    ? "Number of floors is required"
                    : false,
              }}
              disabled={isView}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dataFloorNo.base_number_of_floors.map((item) => {
                    return { value: item.id, label: item.name_json.en };
                  })}
                  placeholder="Select Floor Number"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: errors.number_of_floors_id
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

            {errors.number_of_floors_id && (
              <span className="text-red-500 text-xs capitalize">
                * {errors.number_of_floors_id.message}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="construction_level_id"
            className="text-black text-base font-medium capitalize"
          >
            Construction level<span className="text-red-400"> *</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">የቦታው ግንባታ ያለበት ደረጃ</span>
          <Controller
            name="construction_level_id"
            control={control}
            rules={{ required: "construction level is required" }}
            disabled={isView}
            render={({ field }) => (
              <Select
                {...field}
                options={dataConLevels.base_construction_levels.map((item) => {
                  return { value: item.id, label: item.name_json.en };
                })}
                placeholder="Select level"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: errors.kebele_id
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

          {errors.construction_level_id && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.construction_level_id.message}
            </span>
          )}
        </div>

        {selectedConstructionLevel?.label.toLowerCase() ===
          "under_construction" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="construction_status"
              className="text-black text-base font-medium capitalize"
            >
              Construction Status (%) <span className="text-red-400">*</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">
              የግንባታው ሂደት ያለበት ደረጃ (በፐርሰንት)
            </span>
            <input
              type="number"
              placeholder="e.g., 50"
              id="construction_status"
              disabled={isView}
              className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
              {...register("construction_status", {
                required: "Construction status is required",
                min: { value: 0, message: "Minimum value is 0%" },
                max: { value: 100, message: "Maximum value is 100%" },
              })}
              rules={{
                required:
                  selectedConstructionLevel?.label.toLowerCase() ===
                  "under_construction"
                    ? "Construction status is required"
                    : false,
              }}
            />
            {errors.construction_status && (
              <span className="text-red-500 text-xs capitalize">
                * {errors.construction_status.message}
              </span>
            )}
          </div>
        )}

        {/* Construction Work Started Date */}
        <div className="flex flex-col">
          <label
            htmlFor="construction_work_started_date"
            className="text-black text-base font-medium capitalize"
          >
            Construction Started Date <span className="text-red-400">*</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">የግንባታ ሥራው የተጀመረበት ዓ.ም</span>
          <input
            name="construction_work_started_date"
            type="date"
            placeholder="e.g., block 14"
            disabled={isView}
            id="construction_work_started_date"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
            {...register("construction_work_started_date", {
              required: "Start date is required",
            })}
          />
          {errors.construction_work_started_date && (
            <span className="text-red-500 text-xs capitalize">
              * {errors.construction_work_started_date.message}
            </span>
          )}
        </div>

        {selectedConstructionLevel?.label.toLowerCase() === "finished" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="construction_completed_date"
              className="text-black text-base font-medium capitalize"
            >
              Construction Completed Date{" "}
              <span className="text-red-400">*</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">ግንባታው የተጠናቀቀበት ዓ.ም</span>
            <input
              name="construction_completed_date"
              type="date"
              placeholder="e.g., block 14"
              disabled={isView}
              id="construction_completed_date"
              className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
              {...register("construction_completed_date", {
                required: "Completion date is required",
              })}
              rules={{
                required:
                  selectedConstructionLevel?.label.toLowerCase() === "finished"
                    ? "Shade Type is required"
                    : false,
              }}
            />
            {errors.construction_completed_date && (
              <span className="text-red-500 text-xs capitalize">
                * {errors.construction_completed_date.message}
              </span>
            )}
          </div>
        )}
        {selectedConstructionLevel?.label.toLowerCase() === "stopped" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="construction_stopped_reason_id"
              className="text-black text-base font-medium capitalize"
            >
              Reason for stopping construction
              <span className="text-red-400"> *</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">ግንባታው የተቋረጠበት ምክንያት</span>
            <Controller
              name="construction_stopped_reason_id"
              control={control}
              disabled={isView}
              rules={{
                required:
                  selectedConstructionLevel?.label.toLowerCase() === "stopped"
                    ? "Reason is required"
                    : false,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dataReasonStop.base_construction_stopped_reasons.map(
                    (item) => {
                      return { value: item.id, label: item.name_json.en };
                    }
                  )}
                  isLoading={false}
                  placeholder="Select Reason"
                  isSearchable={false}
                  isClearable={true}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#3170B5" : "#CED4DB",
                      padding: ".5px",
                      marginTop: ".5rem",
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                      fontSize: "0.85rem",
                    }),
                  }}
                  theme={(theme) => handleTheme(theme)}
                  className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
                />
              )}
            />
            {errors.construction_stopped_reason_id && (
              <p className="text-red-500 text-xs capitalize m*t-1">
                * {errors.construction_stopped_reason_id.message}
              </p>
            )}
          </div>
        )}

        {selectedConstructionLevel?.label.toLowerCase() === "finished" && (
          <div className="flex flex-col border p-4">
            <label
              htmlFor="not_transferred_reason_id"
              className="text-black text-base font-medium capitalize"
            >
              Reason for not being transferred
              <span className="text-red-400"> *</span>
            </label>
            <span className="text-[#CBCBCB] text-sm">
              ለኢንተርፕራይዞች ያልተላለፈበት ምክንያት
            </span>
            <Controller
              name="not_transferred_reason_id"
              control={control}
              disabled={isView}
              rules={{
                required:
                  (selectedConstructionLevel?.label.toLowerCase() ===
                    "finished") ===
                  "shed"
                    ? "Reason is required"
                    : false,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dataReasonTrans.base_not_transferred_reasons.map(
                    (item) => {
                      return { value: item.id, label: item.name_json.en };
                    }
                  )}
                  isLoading={false}
                  placeholder="Select Reason"
                  isSearchable={false}
                  isClearable={true}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#3170B5" : "#CED4DB",
                      padding: ".5px",
                      marginTop: ".5rem",
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                      fontSize: "0.85rem",
                    }),
                  }}
                  theme={(theme) => handleTheme(theme)}
                  className="inline text-emdmsPrimary placeholder:text-N95 placeholder:text-sm rounded-md focus:border-emdmsPrimary focus:ring-emdmsPrimary"
                />
              )}
            />
            {errors.not_transferred_reason_id && (
              <p className="text-red-500 text-xs capitalize m*t-1">
                * {errors.not_transferred_reason_id.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="total_cost_of_production"
            className="text-black text-base font-medium capitalize"
          >
            Total cost of production
            <span className="text-red-400"> *</span>
          </label>
          <span className="text-[#CBCBCB] text-sm">
            አጠቃላይ ለማምረቻ/ መሸጫ ቦታው የወጣ ወጪ በብር
          </span>
          <input
            {...register("total_cost_of_production", {
              required: "Total cost of production is required",
              valueAsNumber: true,
            })}
            name="total_cost_of_production"
            type="number"
            disabled={isView}
            placeholder="eg. 100000"
            id="total_cost_of_production"
            className="w-full p-2 border border-[#CED4DB] mt-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3170B5] focus:border-[#3170B5]"
          />
          {errors.total_cost_of_production && (
            <p className="text-red-500 text-xs capitalize m*t-1">
              * {errors.total_cost_of_production.message}
            </p>
          )}
        </div>
      </div>
      {!isView && (
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
            ) : selectedShade ? (
              "Update"
            ) : (
              "Register"
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default RegisterShade;

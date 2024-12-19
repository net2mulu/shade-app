import { useQuery } from "@apollo/client";
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

const RegisterShade = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const client = useMemo(() => resetClient(), []);

  const { loading: loadingKebele, data: dataKebele } = useQuery(GET_KEBELES, {
    variables: {
      limit: 10,
    },
    skip: false,
    client,
  });

  const { loading: loadingCity, data: dataCity } = useQuery(GET_CITIES, {
    skip: false,
    client,
  });

  const { loading: loadingZone, data: dataZone } = useQuery(GET_ZONES, {
    variables: {
      limit: 10,
    },
    skip: false,
    client,
  });

  const { loading: loadingRegion, data: dataRegion } = useQuery(GET_REGIONS, {
    skip: false,
    client,
  });

  const { loading: loadingSector, data: dataSector } = useQuery(GET_SECTORS, {
    skip: false,
    client,
  });

  const { loading: loadingService, data: dataService } = useQuery(
    GET_SERVICES_TYPES,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingShed, data: dataShed } = useQuery(GET_SHED_TYPES, {
    skip: false,
    client: useMemo(() => getTempClient(), []),
  });

  const { loading: loadingBuiltBy, data: dataBuiltBy } = useQuery(
    GET_BUILT_BY,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingConLevels, data: dataConLevels } = useQuery(
    GET_CONSTRUCTION_LEVELS,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingConTypes, data: dataConTypes } = useQuery(
    GET_CONSTRUCTION_TYPES,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingReasonTrans, data: dataReasonTrans } = useQuery(
    GET_CONSTRUCTION_NOT_TRANSFERRED_REASON,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingReasonStop, data: dataReasonStop } = useQuery(
    GET_CONSTRUCTION_STOPPED_REASON,
    {
      skip: false,
      client: useMemo(() => getTempClient(), []),
    }
  );

  const { loading: loadingFloorNo, data: dataFloorNo } = useQuery(GET_FLOORS, {
    skip: false,
    client: useMemo(() => getTempClient(), []),
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

  const onSubmit = (data) => {
    console.log(data);
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
          {errors.city_id && (
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
              rules={{
                required:
                selectedConstructionLevel?.label.toLowerCase() === "finished" === "shed"
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

      <div className="flex justify-end items-center w-full mt-4">
        <Button
          type="submit"
          className="inline-flex items-center gap-2 w-32 justify-center rounded-md bg-[#3170B5] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterShade;

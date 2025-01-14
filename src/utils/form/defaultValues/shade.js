export const getShadeValues = (selectedShade) => {
  if (!selectedShade) return {};

  return {
    defaultValues: {
      name: selectedShade?.name.en ?? "",
      block_no: selectedShade?.block_no ?? "",
      region_id: {
        label: selectedShade?.region?.namejson?.en,
        value: selectedShade?.region?.id,
      },
      district_id: {
        label: selectedShade?.district?.namejson?.en,
        value: selectedShade?.district?.id,
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
        label: selectedShade?.is_suitable_for_disabled_people ? "Yes" : "No",
        value: selectedShade?.is_suitable_for_disabled_people ? true : false,
      },
      number_of_floors_id: {
        label: selectedShade?.number_of_floor?.name_json?.en,
        value: selectedShade?.number_of_floor?.id,
      },
      construction_status: selectedShade?.construction_status ?? "",
      total_cost_of_production: selectedShade?.total_cost_of_production ?? "",
      construction_work_started_date:
        selectedShade?.construction_work_started_date ?? "",
      ...(selectedShade?.construction_completed_date && {
        construction_completed_date: selectedShade.construction_completed_date,
      }),
      ...(selectedShade?.construction_stopped_date && {
        construction_stopped_date: selectedShade.construction_stopped_date,
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
  };
};

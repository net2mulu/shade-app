export const getEnterpriseValues = (selectedEnterprise) => {
  if (!selectedEnterprise) {
    return {};
  }

  return {
    defaultValues: {
      organization_id: {
        label: selectedEnterprise?.enterprise[0]?.namejson?.en ?? "",
        value: selectedEnterprise?.enterprise[0]?.id ?? null,
      },
      used_for_intended_purpose: {
        label: selectedEnterprise?.used_for_intended_purpose ? "Yes" : "No",
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
  };
};

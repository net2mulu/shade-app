import { gql } from "@apollo/client";

export const GET_SHEDS = gql`
  query MyQuery($offset: Int, $limit: Int, $where: enterprise_sheds_bool_exp) {
    enterprise_sheds(
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
      where: $where
    ) {
      assigned_sheds {
        id
        created_at
        assigned_at
        enterprise {
          id
          young_male
          young_female
          used_for_intended_purpose
          updated_at
          returning_citizens_male
          returning_citizens_female
          reason_not_used_for_intended_purpose
          people_with_disabilities_male
          people_with_disabilities_female
          internally_displaced_male
          internally_displaced_female
          created_at
        }
        status
      }
      id
      name
      shed_type {
        name_json
        __typename
        id
      }
      service_type {
        name_json
        __typename
        id
      }
      number_of_floors_id
      production_area
      number_of_floor {
        name_json
        __typename
        id
      }
      not_transferred_reason {
        name_json
        __typename
        id
      }
      manufacturing_place
      is_suitable_for_disabled_people
      have_water
      have_toilet
      have_electricity
      created_at
      construction_work_started_date
      construction_type_id
      construction_stopped_reason_id
      construction_stopped_date
      construction_status
      complete_infrastructure
      block_no
      __typename
      city {
        id
        namejson
      }
      kebele {
        id
        namejson
      }
      not_transferred_reason_id
      number_of_enterprises
      built_by {
        name_json
        id
      }
      construction_completed_date
      construction_level {
        id
        name_json
      }
      construction_stopped_reason {
        id
        name_json
      }
      construction_type {
        id
        name_json
      }
      region {
        namejson
        id
      }
      sector {
        id
        namejson
      }
      zone {
        id
        namejson
      }
      total_cost_of_production
    }
    enterprise_sheds_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ASSIGNED_SHEDS = gql`
  query MyQuery($offset: Int, $limit: Int, $where: enterprise_sheds_bool_exp) {
    enterprise_sheds(
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
      where: $where
    ) {
      assigned_sheds {
        id
        created_at
        assigned_at
        enterprise {
          id
          young_male
          young_female
          used_for_intended_purpose
          updated_at
          returning_citizens_male
          returning_citizens_female
          reason_not_used_for_intended_purpose
          people_with_disabilities_male
          people_with_disabilities_female
          internally_displaced_male
          internally_displaced_female
          created_at
        }
        status
      }
      id
      name
      shed_type {
        name_json
        __typename
        id
      }
      service_type {
        name_json
        __typename
        id
      }
      number_of_floors_id
      production_area
      number_of_floor {
        name_json
        __typename
        id
      }
      not_transferred_reason {
        name_json
        __typename
        id
      }
      manufacturing_place
      is_suitable_for_disabled_people
      have_water
      have_toilet
      have_electricity
      created_at
      construction_work_started_date
      construction_type_id
      construction_stopped_reason_id
      construction_stopped_date
      construction_status
      complete_infrastructure
      block_no
      __typename
      city {
        id
        namejson
      }
      kebele {
        id
        namejson
      }
      not_transferred_reason_id
      number_of_enterprises
      built_by {
        name_json
        id
      }
      construction_completed_date
      construction_level {
        id
        name_json
      }
      construction_stopped_reason {
        id
        name_json
      }
      construction_type {
        id
        name_json
      }
      region {
        namejson
        id
      }
      sector {
        id
        namejson
      }
      zone {
        id
        namejson
      }
      total_cost_of_production
    }
    enterprise_sheds_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_UNASSIGNED_SHEDS = gql`
  query MyQuery($offset: Int, $limit: Int, $where: enterprise_sheds_bool_exp) {
    enterprise_sheds(
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
      where: $where
    ) {
      assigned_sheds {
        id
        created_at
        assigned_at
        enterprise {
          id
          young_male
          young_female
          used_for_intended_purpose
          updated_at
          returning_citizens_male
          returning_citizens_female
          reason_not_used_for_intended_purpose
          people_with_disabilities_male
          people_with_disabilities_female
          internally_displaced_male
          internally_displaced_female
          created_at
        }
        status
      }
      id
      name
      shed_type {
        name_json
        __typename
        id
      }
      service_type {
        name_json
        __typename
        id
      }
      number_of_floors_id
      production_area
      number_of_floor {
        name_json
        __typename
        id
      }
      not_transferred_reason {
        name_json
        __typename
        id
      }
      manufacturing_place
      is_suitable_for_disabled_people
      have_water
      have_toilet
      have_electricity
      created_at
      construction_work_started_date
      construction_type_id
      construction_stopped_reason_id
      construction_stopped_date
      construction_status
      complete_infrastructure
      block_no
      __typename
      city {
        id
        namejson
      }
      kebele {
        id
        namejson
      }
      not_transferred_reason_id
      number_of_enterprises
      built_by {
        name_json
        id
      }
      construction_completed_date
      construction_level {
        id
        name_json
      }
      construction_stopped_reason {
        id
        name_json
      }
      construction_type {
        id
        name_json
      }
      region {
        namejson
        id
      }
      sector {
        id
        namejson
      }
      zone {
        id
        namejson
      }
      total_cost_of_production
    }
    enterprise_sheds_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ENTERPRISES = gql`
  query GetEnterprises($offset: Int, $limit: Int) {
    enterprise_enterprises(
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
    ) {
      id
      created_at
      used_for_intended_purpose
      reason_not_used_for_intended_purpose
      contract_transferred_time
      contract_expiration_time
      young_male
      young_female
      internally_displaced_male
      internally_displaced_female
      people_with_disabilities_male
      people_with_disabilities_female
      returning_citizens_male
      returning_citizens_female
      returning_citizens_male
      returning_citizens_female
      enterprise {
        id
        namejson
        employees_aggregate {
          aggregate {
            count
          }
        }
        addresses {
          sub_city
        }
      }
      assigned_sheds_aggregate {
        aggregate {
          count
        }
      }
    }
    enterprise_enterprises_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ENTERPRISES_ASSIGNED_SHEDS = gql`
  query GetAssignedSheds {
    enterprise_assigned_sheds(order_by: { assigned_at: desc }, limit: 5) {
      assigned_at
      shed {
        id
        name
        region {
          namejson
        }
      }
      created_at
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GetEnterprises {
    organization_namespace {
      organizations {
        id
        namejson
      }
    }
  }
`;

export const GET_COMBINED_SHED_COUNT = gql`
  query CombinedQuery {
    totalShedsCount: enterprise_sheds_aggregate {
      aggregate {
        count
      }
    }
    assignedShedsCount: enterprise_sheds_aggregate(
      where: { assigned_sheds_aggregate: { count: { predicate: { _gt: 0 } } } }
    ) {
      aggregate {
        count
      }
    }
    unassignedShedsCount: enterprise_sheds_aggregate(
      where: { assigned_sheds_aggregate: { count: { predicate: { _eq: 0 } } } }
    ) {
      aggregate {
        count
      }
    }
    completedConstructionsCount: enterprise_sheds_aggregate(
      where: { construction_completed_date: { _is_null: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_COMBINED_CONSTRUCTION_STATUS = gql`
  query CombinedQuery {
    stopped: enterprise_sheds_aggregate(
      where: { construction_stopped_date: { _is_null: false } }
    ) {
      aggregate {
        count
      }
    }
    completed: enterprise_sheds_aggregate(
      where: { construction_completed_date: { _is_null: false } }
    ) {
      aggregate {
        count
      }
    }
    total: enterprise_sheds_aggregate {
      aggregate {
        count
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const INSERT_SHED = gql`
  mutation InsertSheds(
    $have_electricity: Boolean
    $have_toilet: Boolean
    $have_water: Boolean
    $is_suitable_for_disabled_people: Boolean
    $construction_completed_date: date
    $construction_stopped_date: date
    $construction_work_started_date: date
    $name: jsonb
    $number_of_enterprises: numeric
    $block_no: String
    $complete_infrastructure: String
    $construction_status: String
    $manufacturing_place: String
    $production_area: String
    $total_cost_of_production: String
    $built_by_id: uuid
    $city_id: uuid
    $construction_level_id: uuid
    $construction_stopped_reason_id: uuid
    $construction_type_id: uuid
    $created_by_id: uuid
    $kebele_id: uuid
    $not_transferred_reason_id: uuid
    $number_of_floors_id: uuid
    $region_id: uuid
    $sector_id: uuid
    $service_type_id: uuid
    $shed_type_id: uuid
    $updated_by_ud: uuid
    $zone_id: uuid
  ) {
    insert_enterprise_sheds(
      objects: {
        have_electricity: $have_electricity
        have_toilet: $have_toilet
        have_water: $have_water
        is_suitable_for_disabled_people: $is_suitable_for_disabled_people
        construction_completed_date: $construction_completed_date
        construction_stopped_date: $construction_stopped_date
        construction_work_started_date: $construction_work_started_date
        name: $name
        number_of_enterprises: $number_of_enterprises
        block_no: $block_no
        complete_infrastructure: $complete_infrastructure
        construction_status: $construction_status
        manufacturing_place: $manufacturing_place
        production_area: $production_area
        total_cost_of_production: $total_cost_of_production
        built_by_id: $built_by_id
        city_id: $city_id
        construction_level_id: $construction_level_id
        construction_stopped_reason_id: $construction_stopped_reason_id
        construction_type_id: $construction_type_id
        created_by_id: $created_by_id
        kebele_id: $kebele_id
        not_transferred_reason_id: $not_transferred_reason_id
        number_of_floors_id: $number_of_floors_id
        region_id: $region_id
        sector_id: $sector_id
        service_type_id: $service_type_id
        shed_type_id: $shed_type_id
        updated_by_ud: $updated_by_ud
        zone_id: $zone_id
      }
    ) {
      affected_rows
      returning {
        have_electricity
        have_toilet
        have_water
        is_suitable_for_disabled_people
        construction_completed_date
        construction_stopped_date
        construction_work_started_date
        name
        number_of_enterprises
        block_no
        complete_infrastructure
        construction_status
        manufacturing_place
        production_area
        total_cost_of_production
        created_at
        updated_at
        built_by_id
        city_id
        construction_level_id
        construction_stopped_reason_id
        construction_type_id
        created_by_id
        id
        kebele_id
        not_transferred_reason_id
        number_of_floors_id
        region_id
        sector_id
        service_type_id
        shed_type_id
        updated_by_ud
        zone_id
      }
    }
  }
`;

export const ASSIGN_SHED = gql`
  mutation InsertAssignedSheds(
    $enterprise_id: uuid
    $shed_id: uuid
    $assigned_by_id: uuid
  ) {
    insert_enterprise_assigned_sheds(
      objects: {
        enterprise_id: $enterprise_id
        shed_id: $shed_id
        assigned_by_id: $assigned_by_id
      }
    ) {
      affected_rows
      returning {
        id
        created_at
        updated_at
        created_by_id
        updated_by_id
        enterprise_id
        shed_id
        status
        assigned_at
        assigned_by_id
      }
    }
  }
`;

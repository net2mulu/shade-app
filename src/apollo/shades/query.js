import { gql } from "@apollo/client";

export const GET_SHEDS = gql`
  query MyQuery {
    enterprise_sheds {
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
      id,
      name
      shed_type {
        name_json
      }
      service_type {
        name_json
      }
      number_of_floors_id
      production_area
      number_of_floor {
        name_json
      }
      not_transferred_reason {
        name_json
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
      construction_completed_date
      complete_infrastructure
      block_no
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GET_USER($where: registration_labors_bool_exp) {
    registration_namespace {
      labors(where: $where) {
        id
        first_name
        father_name
        grand_father_name
        registration_id
        profile_picture
        labor_id
        user_info {
          id
          phoneNumber
          email
        }
      }
    }
  }
`;

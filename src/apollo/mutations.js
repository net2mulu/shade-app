import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signin($password: String = "", $phoneNumber: String = "") {
    signIn(password: $password, phoneNumber: $phoneNumber) {
      data {
        email
        id
        role
        phoneNumber
      }
      tokens {
        access_token
        refresh_token
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      tokens {
        access_token
        refresh_token
      }
      data {
        email
        id
        phoneNumber
        role
      }
    }
  }
`;

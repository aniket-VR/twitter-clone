import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
query Query($token: String!) {
  verifyGoogleToken(token: $token)
}
`;
export const VERIFY_CURRENT_USER = gql`
query Query {
  getCurrentUser {
    profileImageUrl
    lastName
    id
    firstName
    email
  }
}
`;


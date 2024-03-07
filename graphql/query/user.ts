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
      tweets {
        content
        author {
          profileImageUrl
        }
      }
      followers {
        firstName
        profileImageUrl
        lastName
        id
      }
      following {
        firstName
        profileImageUrl
        lastName
        id
      }
      recommendation {
        firstName
        lastName
        profileImageUrl
        id
      }
    }
  }
`;
export const GET_USER_WITH_ID = gql`
  query GetUserFromId($getUserFromIdId: String!) {
    getUserFromId(id: $getUserFromIdId) {
      firstName
      profileImageUrl
      lastName
      id
      tweets {
        content
        imageURL
        author {
          profileImageUrl
        }
      }
      followers {
        firstName
        profileImageUrl
        lastName
        id
      }
      following {
        firstName
        profileImageUrl
        lastName
        id
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_TWEET = gql`
  mutation Mutation($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      content
      imageURL
    }
  }
`;

export const GET_ALL_TWEET = gql`
  query Query {
    getAllTweet {
      id
      content
      imageURL
      author {
        profileImageUrl
        id
        firstName
        lastName
      }
    }
  }
`;
export const SIGN_URL = gql`
  query Query($imageType: String!) {
    getSignedURLForTweet(imageType: $imageType)
  }
`;

export const DELETE_TWEET = gql`
  query Query($id: String!) {
    deleteTwitte(id: $id)
  }
`;

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
export const LIKE_TWEET = gql`
  query Query($tweetId: String!, $check: Boolean!) {
    likeTweet(tweetId: $tweetId, check: $check)
  }
`;
export const BOOKMARK_TWEET = gql`
  query Query($tweetId: String!, $check: Boolean!) {
    bookmarkTweet(tweetId: $tweetId, check: $check)
  }
`;
export const GET_ALL_BOOKMARK = gql`
  query GetBookMark {
    getBookMark {
      tweet {
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
  }
`;

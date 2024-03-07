import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`;
export const UNFOLLOW_USER = gql`
  mutation UnFollowUser($to: ID!) {
    unFollowUser(to: $to)
  }
`;
export const CHECK_FOLLOW_STATUS = gql`
  mutation Mutation($to: ID!) {
    checkFollowStaus(to: $to)
  }
`;

import { gql } from "@apollo/client";

export const GET_PREVIOUS_MESSAGE = gql`
  query GetPreviousMessage($to: String!) {
    getPreviousMessage(to: $to) {
      reciverMessage {
        message
        reciverId
        id
      }
    }
  }
`;

import { GET_ALL_TWEET } from "@/graphql/query/tweet";
import { useQuery } from "@apollo/client";

export const useGetAllTweet = () => {
  const data = useQuery(GET_ALL_TWEET);
  return { ...data };
};

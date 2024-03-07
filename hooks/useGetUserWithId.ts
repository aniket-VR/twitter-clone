import { GET_USER_WITH_ID } from "@/graphql/query/user";
import { useQuery } from "@apollo/client";

export const useGetUserWithId = (id: string) => {
  const { data, loading, refetch } = useQuery(GET_USER_WITH_ID, {
    variables: {
      getUserFromIdId: id,
    },
  });
  return { data, loading, refetch };
};

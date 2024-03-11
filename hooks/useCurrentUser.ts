import { VERIFY_CURRENT_USER } from "@/graphql/query/user";
import { useQuery } from "@apollo/client";

export const useCurrentUser = () => {
  const data = useQuery(VERIFY_CURRENT_USER);
  console.log("getcurrentuser");
  return { ...data };
};

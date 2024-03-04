import { VERIFY_CURRENT_USER } from "@/graphql/query/user";
import { useQuery } from "@apollo/client";

export const useCurrentUser = ()=>{
    const {refetch,data,loading} = useQuery(VERIFY_CURRENT_USER)
    return {data, loading,refetch}
}
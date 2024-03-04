import { VERIFY_CURRENT_USER } from "@/graphql/query/user";
import { useQuery } from "@apollo/client";

export const useCurrentUser = ()=>{
     const {data,loading,refetch} = useQuery(VERIFY_CURRENT_USER)
     console.log("call current user")
    return {data,loading,refetch}
}
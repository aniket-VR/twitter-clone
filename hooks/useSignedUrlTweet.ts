import { SIGN_URL } from "@/graphql/query/tweet";
import { useLazyQuery } from "@apollo/client";

export const useSignedUrlTweet = () => {
  const [refetachSigned, { data, loading }] = useLazyQuery(SIGN_URL);
  return { refetachSigned, data, loading };
};

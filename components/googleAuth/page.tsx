"use client";
import { VERIFY_CURRENT_USER, VERIFY_TOKEN } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ApolloQueryResult, useLazyQuery, useQuery } from "@apollo/client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import request from "graphql-request";
import React, { useCallback } from "react";

export default function GoogleAuth() {
  const { data, refetch } = useCurrentUser();
  const [varifyUser, { data: UserData }] = useLazyQuery(VERIFY_TOKEN);
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const authToken = cred.credential;
      if (!authToken) return "google token not found";
      varifyUser({
        variables: {
          token: authToken,
        },
      });
      console.log(authToken);
    },
    []
  );
  if (UserData) {
    window.localStorage.setItem("__twitter_token", UserData.verifyGoogleToken);
    refetch();
  }
  return (
    <>
      <GoogleLogin onSuccess={handleLoginWithGoogle} />
    </>
  );
}

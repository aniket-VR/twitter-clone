"use client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import React, { useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("__twitter_token");

    operation.setContext({
      headers: {
        authorization: token == null ? "" : `Bearer ${token}`,
      },
    });
    return forward(operation);
  });
  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

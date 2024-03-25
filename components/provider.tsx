"use client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import React, { useContext, useState } from "react";
import { Socket, io } from "socket.io-client";
import { createContext } from "react";
const socket = io(`https://twitter-clone-server-3emo.onrender.com`, {
  transports: ["websocket"],
});

interface context {
  socket: Socket;
}
const socketContext = createContext<context>({ socket });

export const useSocket = () => useContext<context>(socketContext);
export default function Provider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({
    uri: "https://twitter-clone-server-3emo.onrender.com/graphql",
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

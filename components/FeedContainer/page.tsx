"use client";
import { Tweet } from "@/type";
import React, { Key } from "react";
import FeedCard from "../FeedCard/page";

import { useGetAllTweet } from "@/hooks/useGetAllTweet";

export default function FeedContainer() {
  const { refetch, data } = useGetAllTweet();
  if (!data?.getAllTweet)
    return (
      <div className=" flex items-center justify-center w-full h-full ">
        <span>Loading...</span>
      </div>
    );
  return (
    <>
      {data?.getAllTweet ? (
        data?.getAllTweet.map((item: Tweet, key: Key) => (
          <FeedCard
            refetch={refetch}
            key={key}
            currentStatus={false}
            tweetData={item}
          />
        ))
      ) : (
        <h1>No tweet</h1>
      )}
    </>
  );
}

"use client";
import FeedCard from "@/components/FeedCard/page";
import { LoadingUi } from "@/components/Loading";
import { GET_ALL_BOOKMARK } from "@/graphql/query/tweet";
import { Tweet } from "@/type";
import { useQuery } from "@apollo/client";
import React from "react";

export default function BookMark() {
  const { data, loading } = useQuery(GET_ALL_BOOKMARK);
  if (loading) return LoadingUi;
  return (
    <div>
      {data?.getBookMark.map((item: any, key: React.Key) => {
        console.log(item.tweet);
        return (
          <FeedCard
            key={key}
            tweetData={item.tweet}
            currentStatus={true}
            refetch={undefined}
          />
        );
      })}
    </div>
  );
}

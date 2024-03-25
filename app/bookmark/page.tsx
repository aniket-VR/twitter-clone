"use client";
import FeedCard from "@/components/FeedCard/page";
import { LoadingUi } from "@/components/Loading";
import { GET_ALL_BOOKMARK } from "@/graphql/query/tweet";
import { Tweet } from "@/type";
import { useQuery } from "@apollo/client";
import React from "react";

export default function page() {
  const { data, loading } = useQuery(GET_ALL_BOOKMARK);
  if (loading) return LoadingUi;
  return (
    <div>
      {data?.getBookMark.map((item: any) => {
        console.log(item.tweet);
        return (
          <FeedCard
            tweetData={item.tweet}
            currentStatus={true}
            refetch={undefined}
          />
        );
      })}
    </div>
  );
}

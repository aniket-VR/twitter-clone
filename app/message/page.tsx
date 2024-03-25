"use client";
import { socketClient } from "@/client/socket";
import { LoadingUi } from "@/components/Loading";
import { GET_FOLLOWING } from "@/graphql/query/user";
import { User } from "@/type";
import { useLazyQuery, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function MessagesPage() {
  const { data, loading, refetch } = useQuery(GET_FOLLOWING);
  useEffect(() => {
    refetch();
    console.log("messagespage");
  });
  if (loading) return LoadingUi;
  return (
    <div>
      {data?.getFollowing.map((user: User, key: React.Key) => {
        return (
          <Link key={key} href={`/message/${user.id}`}>
            <div className="flex p-2 gap-3 border-[1px] border-gray-600">
              <span>
                <Image
                  className="rounded-full"
                  src={user.profileImageUrl}
                  width={50}
                  height={50}
                  alt="user-profile"
                />
              </span>
              <div>
                <div className="flex gap-2">
                  <span>{user.firstName} </span> <span>{user.lastName}</span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

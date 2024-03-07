"use client";
import { VERIFY_CURRENT_USER } from "@/graphql/query/user";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GoogleAuth from "../googleAuth/page";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/type";
import Image from "next/image";
import Link from "next/link";

export default function GoogleContainer() {
  const { data, loading } = useCurrentUser();
  if (loading) return <h1>loading</h1>;
  return (
    <>
      {data?.getCurrentUser != null ? (
        <>
          {data?.getCurrentUser?.recommendation.length != 0 && (
            <div className=" bg-gray-700 p-4 text-white rounded-lg w-fit m-4 ">
              {data?.getCurrentUser?.recommendation.map((item: User) => {
                return (
                  <div className="grid  grid-cols-6 gap-2  items-center">
                    {item?.profileImageUrl && (
                      <Image
                        className="col-span-2 rounded-full"
                        alt="user-profile"
                        height={40}
                        width={40}
                        src={item?.profileImageUrl}
                      />
                    )}
                    <div className="col-span-4">
                      <h1 className="text-sm  text-white">
                        {item.firstName} {item.lastName}
                      </h1>
                      <Link href={`/${item.id}`}>
                        <span className="px-2 py-1 rounded-[4px] text-xs  bg-white text-black">
                          View
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <div className=" bg-gray-700 p-4 text-white rounded-lg w-fit m-4 ">
            <h1 className="text-lg text-white mb-2">New to twitter</h1>
            <GoogleAuth />
          </div>
        </>
      )}
    </>
  );
}

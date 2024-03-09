"use client";
import Image from "next/image";
import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { ApolloQueryResult, useLazyQuery, useQuery } from "@apollo/client";
import { Tweet } from "@/type";
import Link from "next/link";
import { DELETE_TWEET } from "@/graphql/query/tweet";
import toast from "react-hot-toast";

export default function FeedCard({
  tweetData,
  currentStatus,
  refetch,
}: {
  tweetData: Tweet;
  currentStatus: Boolean;
  refetch: () => void;
}) {
  const [deleteTweetQuery, { data }] = useLazyQuery(DELETE_TWEET);
  return (
    <div className="border-b-[1px] border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-1">
          <Image
            alt="user-image"
            className="rounded-full"
            height={50}
            width={50}
            src={tweetData.author.profileImageUrl}
          />
        </div>
        <div className="col-span-11 text-sm ">
          <Link href={`/${tweetData.author.id}`}>
            {" "}
            <h5>
              {`${tweetData.author.firstName} ${tweetData.author.lastName}`}
            </h5>
          </Link>
          <p className="mt-1 mb-2">{tweetData.content}</p>
          <Image
            alt="tweet-image"
            height={100}
            width={200}
            src={tweetData.imageURL}
          />
          <div className="flex mt-4 justify-between text-xl">
            {currentStatus ? (
              <div
                onClick={() => {
                  toast.loading("Tweet deleting", { id: "2" });
                  deleteTweetQuery({
                    variables: {
                      id: tweetData?.id,
                    },
                  }).then((resp) => {
                    console.log(resp);
                    if (resp.data.deleteTwitte) {
                      refetch();
                      toast.success("Tweeet Deleted", { id: "2" });
                    } else toast.success("Failed to delete", { id: "2" });
                  });
                }}
              >
                <MdDelete />
              </div>
            ) : (
              ""
            )}

            <div>
              <FiMessageCircle />
            </div>
            <div>
              <BiRepost />
            </div>

            <div>
              <IoIosHeartEmpty />
            </div>
            <div>
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

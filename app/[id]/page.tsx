"use client";
import FeedCard from "@/components/FeedCard/page";
import { LoadingUi } from "@/components/Loading";
import {
  CHECK_FOLLOW_STATUS,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "@/graphql/mutation/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGetUserWithId } from "@/hooks/useGetUserWithId";
import { Tweet, User } from "@/type";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function page() {
  const params = useParams();
  const [followUser, { data: followUserStatus }] = useMutation(FOLLOW_USER);
  const [unfollowUser, { data: unfollow }] = useMutation(UNFOLLOW_USER);
  const { data: currentUser, refetch: currentUserRefetch } = useCurrentUser();
  const [checkFollowStatus, { data: followStatusM }] =
    useMutation(CHECK_FOLLOW_STATUS);
  const { data, loading, refetch } = useGetUserWithId(params.id as string);
  const [followStatus, setFollowStatus] = useState(false);
  useEffect(() => {
    checkFollowStatus({
      variables: {
        to: params.id,
      },
    }).then((data) => {
      setFollowStatus(data.data.checkFollowStaus);
    });
  }, []);
  if (loading) return LoadingUi;

  if (data?.getUserFromId == null)
    return (
      <>
        <div className="h-screen w-full flex items-center justify-center ">
          <h1 className="text-2xl font-bold">User not found</h1>
        </div>
      </>
    );
  return (
    <>
      <div className="text-white mt-2">
        <div className="border-b-[1px] pb-2 border-gray-600">
          <nav className="ml-3  flex items-center gap-5">
            <FaArrowLeftLong />
            <div>
              <h1 className="font-bold">{data?.getUserFromId?.firstName}</h1>
              <p className="text-xs text-gray-500 font-semibold">
                {data?.getUserFromId?.tweets?.length} tweetS
              </p>
            </div>
          </nav>
          <div className="mx-6  mt-4 items-center ">
            <div className="">
              {data?.getUserFromId?.profileImageUrl && (
                <Image
                  className="rounded-full"
                  alt="profile_image"
                  height={80}
                  width={80}
                  src={data.getUserFromId.profileImageUrl}
                />
              )}
              <h1 className="mt-2 text-2xl font-bold ">
                {data?.getUserFromId?.firstName} {data?.getUserFromId?.lastName}
              </h1>
              <div className="flex justify-between">
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span>{data?.getUserFromId?.followers.length} followers</span>
                  <span>{data?.getUserFromId?.following.length} following</span>
                </div>
                {currentUser?.getCurrentUser?.id !==
                  data?.getUserFromId?.id && (
                  <>
                    {followStatus ? (
                      <button
                        onClick={() => {
                          toast.loading("Unfollowing", { id: "4" });
                          unfollowUser({
                            variables: {
                              to: params.id,
                            },
                          }).then(() => {
                            refetch({
                              variables: {
                                getUserFromIdId: params.id,
                              },
                            });
                            currentUserRefetch();
                            toast.success("Unfollowed", { id: "4" });
                            setFollowStatus(false);
                          });
                        }}
                        className="bg-white text-black px-3 py-1 rounded-full text-sm"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toast.loading("following", { id: "5" });
                          followUser({
                            variables: {
                              to: params.id,
                            },
                          }).then(() => {
                            refetch({
                              variables: {
                                getUserFromIdId: params.id,
                              },
                            });
                            currentUserRefetch();
                            toast.success("followed", { id: "5" });
                            setFollowStatus(true);
                          });
                        }}
                        className="bg-white text-black px-3 py-1 rounded-full text-sm"
                      >
                        Follow
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {data?.getUserFromId?.tweets.map((tweetItem: Tweet) => (
            <FeedCard
              tweetData={tweetItem}
              currentStatus={
                currentUser?.getCurrentUser?.id === data?.getUserFromId?.id
              }
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </>
  );
}

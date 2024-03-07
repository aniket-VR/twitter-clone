"use client";
import { CREATE_TWEET, SIGN_URL } from "@/graphql/query/tweet";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGetAllTweet } from "@/hooks/useGetAllTweet";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { IoMdImage } from "react-icons/io";
import { useSignedUrlTweet } from "@/hooks/useSignedUrlTweet";
import axios from "axios";
import profile_url from "../../constant/profile.png";
const tempTweetData = {
  content: "",
  imageURL: "",
};
export default function TweetCard() {
  const { refetch } = useGetAllTweet();
  const { refetachSigned, data: signData, loading } = useSignedUrlTweet();
  const { data: userInfo } = useCurrentUser();
  const CurrentUserProfileImg = userInfo?.getCurrentUser?.profileImageUrl
    ? userInfo?.getCurrentUser?.profileImageUrl
    : profile_url;
  const [createTweet, { data }] = useMutation(CREATE_TWEET);
  const [tweetData, setTweetData] = useState("");
  const [content, setContent] = useState("");
  console.log(tweetData, content);

  //   console.log(data)
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      toast.loading("uploading", { id: "1" });
      refetachSigned({
        variables: {
          imageType: file.type.slice(6),
        },
      })
        .then((result) => {
          if (result.data?.getSignedURLForTweet) {
            axios
              .put(result.data?.getSignedURLForTweet, file, {
                headers: {
                  "Content-Type": file.type,
                },
              })
              .then((axiosresult) => {
                const temp = new URL(result.data?.getSignedURLForTweet);
                setTweetData(`${temp.origin + temp.pathname}`);
                toast.success("uploaded", { id: "1" });
              })
              .catch((err) => {
                toast.error("failed to upload", { id: "1" });
              });
          }
        })
        .catch((err) => {
          toast.error("failed to upload", { id: "1" });
        });
    };
  }, []);
  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile]);
  function onCreateTweet() {
    if (!userInfo?.getCurrentUser?.profileImageUrl) {
      console.log("please login first");
      return;
    }
    console.log(tweetData, content);
    toast.loading("tweet adding", { id: "2" });
    createTweet({
      variables: {
        payload: { imageURL: tweetData, content },
      },
    }).then(() => {
      toast.success("tweed added", { id: "2" });
      refetch();
      setTweetData("");
      setContent("");
    });
  }
  const onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  return (
    <div className="border-b-[1px] border-gray-600 p-4  transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-1 ">
          <Image
            alt="user-image"
            className="rounded-full"
            height={50}
            width={50}
            src={CurrentUserProfileImg}
          />
        </div>
        <div className="col-span-11 text-sm ">
          <textarea
            placeholder="What Happening?"
            onChange={onTextareaChange}
            value={content}
            className="w-full bg-transparent text-sm border-b border-slate-700 "
            rows={3}
          ></textarea>
          {tweetData == "" ? (
            ""
          ) : (
            <Image alt="tweet image" width={200} height={100} src={tweetData} />
          )}
          <div className="mt-2 flex justify-between items-center">
            <span
              onClick={handleSelectImage}
              className="p-2  hover:bg-gray-700 rounded-full"
            >
              <IoMdImage className="text-xl " />
            </span>
            <button
              onClick={onCreateTweet}
              className="px-2 py-1 bg-[#1d9bf0] rounded-full"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

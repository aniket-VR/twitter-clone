"use client";
import React, { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FaHashtag } from "react-icons/fa6";
import { PiBell } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { LuBookmark } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import profile_url from "../constant/profile.png";
import Image from "next/image";
import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { useRouter } from "next/router";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
    link: "/",
  },
  {
    title: "Explore",
    icon: <FaHashtag />,
    link: "/explore",
  },
  {
    title: "Notifications",
    icon: <PiBell />,
    link: "/pibell",
  },
  {
    title: "Message",
    icon: <CgMail />,
    link: "/message",
  },

  {
    title: "Bookmarks",
    icon: <LuBookmark />,
    link: "/bookmarks",
  },

  {
    title: "Profile",
    icon: <FaRegUser />,
    link: `/profile`,
  },
];
export default function LeftMenu() {
  const { data } = useCurrentUser();

  const CurrentUserProfileImg = data?.getCurrentUser?.profileImageUrl
    ? data?.getCurrentUser?.profileImageUrl
    : profile_url;
  const CurrentUserName = data?.getCurrentUser?.firstName
    ? data?.getCurrentUser?.firstName
    : "Demo";
  return (
    <>
      <div className="flex h-[100%] flex-col justify-between">
        <div>
          <div className="text-2xl  h-fit w-full flex justify-center rounded-full py-2 px-3  transition-all sm:justify-start text-white hover:bg-gray-600">
            <BsTwitter />
          </div>
          <div className="mt-2 text-2xl sm:text-lg  font-semibold">
            <ul className="flex flex-col items-center sm:block">
              {sidebarMenuItems.map((item, key) => (
                <li key={key}>
                  <Link
                    className="flex mt-2 sm:mt-0 text-white w-fit justify-start px-3 py-1 items-center sm:gap-4 hover:bg-gray-600  rounded-full cursor-pointer "
                    href={item.link}
                  >
                    <span>{item.icon}</span>
                    <span className="hidden sm:block">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col items-center px-3 sm:pr-8 sm:pl-2">
              <button className="bg-[#1d9bf0]  sm:hidden rounded-full flex items-center justify-center  w-full p-2 text-white">
                {" "}
                <BsTwitter />
              </button>

              <button className="bg-[#1d9bf0] hidden sm:block  rounded-full  w-full p-2 text-white">
                {" "}
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex  items-center gap-2 px-3">
            <Image
              alt="user-image"
              className="rounded-full"
              height={50}
              width={50}
              src={CurrentUserProfileImg}
            />
            <span className="hidden sm:block">{CurrentUserName}</span>
          </div>
        </div>
      </div>
    </>
  );
}

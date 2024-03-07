import TweetCard from "@/components/TweetCard/page"
import FeedContainer from "@/components/FeedContainer/page"


import React from 'react'
import { GetServerSideProps } from "next"
import { Tweet } from "@/type"
import { useGetAllTweet } from "@/hooks/useGetAllTweet"

export default function Home() {
 
  return (
    <>
    <TweetCard/>
    <FeedContainer/>
    </>
  )
}


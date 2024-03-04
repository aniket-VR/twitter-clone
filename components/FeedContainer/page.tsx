"use client"
import { Tweet } from '@/type'
import { useQuery } from '@apollo/client'
import React, { Key } from 'react'
import FeedCard from '../FeedCard/page'

import { useGetAllTweet } from '@/hooks/useGetAllTweet'

export default function FeedContainer() {
  const{ refetch,data,loading }= useGetAllTweet()  
  if(loading) return <h1>Loading...</h1>
  return (
    <>{data ? data.getAllTweet.map((item:Tweet,key:Key)=> <FeedCard key={key} tweetData={item}/>) :<h1>No tweet</h1>}</>
  )
}

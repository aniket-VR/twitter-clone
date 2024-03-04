"use client"
import FeedCard from '@/components/FeedCard/page';
import { GET_USER_WITH_ID } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useGetUserWithId } from '@/hooks/useGetUserWithId';
import { Tweet } from '@/type';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

export default function page() {
    const params = useParams()

    const {data,loading} = useGetUserWithId(params.id as string)
    if(loading) return <h1>loading</h1>
    if(data.getUserFromId==null) return (
        <>
        <div className='h-screen w-full flex items-center justify-center '>
        <h1 className='text-2xl font-bold'>User not found</h1>
        </div>
        </>
    )
    return (
    <>
    <div className='text-white mt-2'>
        <nav className='ml-3  flex items-center gap-5'>
            <FaArrowLeftLong/>
            <div>
                <h1 className='font-bold'>{data?.getUserFromId?.firstName}</h1>
                <p className='text-xs text-gray-500 font-semibold'>130 tweet</p>
            </div>
        </nav>
        <div className='ml-6 mt-4 items-center '>
           {data?.getUserFromId?.profileImageUrl && <Image className='rounded-full' alt='profile_image' height={80} width={80} src={data.getUserFromId.profileImageUrl}/>}
           <h1 className='mt-2 text-lg font-semibold '>{data?.getUserFromId?.firstName && data?.getCurrentUser?.firstName}</h1>
        </div>
        {data?.getUserFromId?.tweets.map((tweetItem:Tweet) => <FeedCard tweetData={tweetItem}/>)}
    </div>
    </>
  )
}


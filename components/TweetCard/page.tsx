"use client"
import { CREATE_TWEET } from '@/graphql/query/tweet';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useGetAllTweet } from '@/hooks/useGetAllTweet';
import { CreateTweetData } from '@/type';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdImage } from "react-icons/io";
const tempTweetData= {
    content:"",
    imageURL:""
  }
export default function TweetCard() {
    const{ refetch ,data:newdata,loading}= useGetAllTweet()  
    const{data:userInfo} = useCurrentUser()
    const CurrentUserProfileImg = userInfo?.getCurrentUser?.profileImageUrl?userInfo?.getCurrentUser?.profileImageUrl:"https://avatars.githubusercontent.com/u/102781692?u=2717617b3532445980809ba1f53717cf85c549a2&v=4"
  const [createTweet,{data}] = useMutation(CREATE_TWEET)
  const [tweetData,setTweetData] = useState(tempTweetData);
  if(data){
    toast.success("tweet added",{id:"1"})
    // refetch();
  }
//   console.log(data)
  const handleSelectImage = useCallback(async()=>{
       const input = document.createElement("input")
       input.setAttribute("type","file")
       input.setAttribute("accept","image/*")
       input.click()
       setTweetData({...tweetData,["imageURL"]:input.value})
  },[])
  function onCreateTweet(){
    if(!userInfo?.getCurrentUser?.profileImageUrl) { console.log("please login first"); return}
    console.log(tweetData)
    toast.loading("tweet adding",{id:"1"})
     createTweet({
        variables:{
            payload: tweetData
        }
     })    
     setTweetData(tempTweetData)
  }
  return (
    <div className='border-b-[1px] border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer'>
        <div className='grid grid-cols-12 gap-2 '>
            <div className='col-span-1 '>
                <Image alt='user-image' className='rounded-full'  height={50} width={50} src={CurrentUserProfileImg} /> 
            </div>
            <div className='col-span-11 text-sm '>
              <textarea placeholder='What Happening?' onChange={(e)=>{setTweetData({...tweetData,["content"]:e.target.value}) ;console.log(tweetData.content)}} value={tweetData.content} className='w-full bg-transparent text-sm border-b border-slate-700 ' rows={3}></textarea>
              <div className='mt-2 flex justify-between items-center'>
              <IoMdImage onClick={handleSelectImage} className='text-xl '/>
              <button onClick={onCreateTweet} className='px-2 py-1 bg-[#1d9bf0] rounded-full'>Tweet</button>
              </div>
            </div>
        </div>
    </div>
  )
}

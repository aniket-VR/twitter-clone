"use client"
import Image from 'next/image'
import React from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { useQuery } from '@apollo/client';
import { Tweet } from '@/type';
import Link from 'next/link';

export default function FeedCard({tweetData}:{tweetData:Tweet}) {
  
  return (
    
    <div className='border-b-[1px] border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer'>
        <div className='grid grid-cols-12 gap-2 '>
            <div className='col-span-1 '>
                <Image alt='user-image' className='rounded-full' height={50} width={50} src={tweetData.author.profileImageUrl } />
            </div>
            <div className='col-span-11 text-sm '>
             <Link href={`/${tweetData.author.id}`}> <h5>Aniket Rohokale</h5></Link>
              <p>{tweetData.content}</p>
              <div className='flex mt-4 justify-between text-xl'>
                <div>
<FiMessageCircle/>
                </div>
                <div>
<BiRepost/>
                </div>

                <div>
<IoIosHeartEmpty/>
                </div>
                <div>
<MdOutlineFileUpload/>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

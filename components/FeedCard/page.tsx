import Image from 'next/image'
import React from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

export default function FeedCard() {
  return (
    <div className='border-b-[1px] border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer'>
        <div className='grid grid-cols-12 gap-2 '>
            <div className='col-span-1 '>
                <Image alt='user-image' className='rounded-full' height={50} width={50} src={"https://avatars.githubusercontent.com/u/102781692?u=2717617b3532445980809ba1f53717cf85c549a2&v=4"} /> 
            </div>
            <div className='col-span-11 text-sm '>
              <h5>Aniket Rohokale</h5>
              <p>hello how are you i am fine what about you how was life is going</p>
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

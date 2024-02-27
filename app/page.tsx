import {BsTwitter} from "react-icons/bs"
import {GoHomeFill} from "react-icons/go"
import {FaHashtag} from "react-icons/fa6"
import {PiBell} from "react-icons/pi"
import { CgMail } from "react-icons/cg";
import { RiFileList2Line } from "react-icons/ri";
import { LuBookmark } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/components/FeedCard/page";

export default function Home() {
  interface TwitterSidebarButton {
    title:string,
    icon:React.ReactNode
  }
  const sidebarMenuItems:TwitterSidebarButton[]= [
    {
      title:"Home",
      icon:<GoHomeFill/>
    },
    {
      title:"Explore",
      icon:<FaHashtag/>
    },
    {
      title:"Notifications",
      icon:<PiBell/>
    },
    {
      title:"Message",
      icon:<CgMail/>
    },
    // {
    //   title:"Lists",
    //   icon:<RiFileList2Line/>
    // },
    {
      title:"Bookmarks",
      icon:<LuBookmark/>
    },
    // {
    //   title:"Communities",
    //   icon:<FaUserGroup/>
    // },
    // {
    //   title:"Premium",
    //   icon:<BsTwitter/>
    // },
    {
      title:"Profile",
      icon:<FaRegUser/>
    },
    // {
    //   title:"More",
    //   icon:<CgMoreO/>
    // }
  ]
  return (
  <div>
    <div className="grid px-28 text-white grid-cols-12 h-screen w-screen">
      <div className="col-span-3 pt-2 pl-2 pr-4 ">
        <div className="text-2xl h-fit w-fit rounded-full py-2 px-3  transition-all justify-start text-white hover:bg-gray-600">
          <BsTwitter/>
        </div>
        <div className="mt-2 text-lg font-semibold">
          <ul>
            {sidebarMenuItems.map((item,key)=> <li key={key} className="flex text-white w-fit justify-start px-3 py-1 items-center gap-4 hover:bg-gray-600  rounded-full cursor-pointer "><span >{item.icon}</span><span>{item.title}</span></li>)}
          </ul>
          <div className="mt-4 pr-8 pl-2">
          <button className="bg-[#1d9bf0]  rounded-full  w-full p-2 text-white"> Tweet</button>
          </div>
        </div>
      </div>
      <div className="col-span-6 border-x-[1px] no-scrollbar  h-screen overflow-scroll  border-x-slate-500 ">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </div>
      <div className="col-span-3 text-black ">right</div>
    </div>
  </div>
  );
}

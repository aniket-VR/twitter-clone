import { BsTwitter } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FaHashtag } from "react-icons/fa6";
import { PiBell } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { LuBookmark } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import GoogleContainer from "@/components/googleContainer/page";
import TweetCard from "@/components/TweetCard/page";
import FeedContainer from "@/components/FeedContainer/page";
import LeftMenu from "../LeftMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
interface TwitterLayoutProps {
  children: React.ReactNode;
}

export const TwitterLayout: React.FC<TwitterLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="grid sm:px-28 text-white grid-cols-12 h-screen w-screen">
        <div className=" col-span-2 flex flex-col items-center mt-2 sm:mt-0 sm:block sm:col-span-3 sm:pt-2 sm:pl-2 sm:pr-4 ">
          <LeftMenu />
        </div>
        <div className="col-span-10 sm:col-span-6 border-x-[1px] no-scrollbar  h-screen overflow-scroll  border-x-slate-500 ">
          {children}
        </div>
        <div className="hidden sm:block sm:col-span-3 text-black ">
          <GoogleContainer />
        </div>
      </div>
    </div>
  );
};

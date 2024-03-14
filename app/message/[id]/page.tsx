"use client";
import { socketClient } from "@/client/socket";
import { LoadingUi } from "@/components/Loading";
import { useSocket } from "@/components/provider";
import { GET_PREVIOUS_MESSAGE } from "@/graphql/message/message";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGetUserWithId } from "@/hooks/useGetUserWithId";
import { useLazyQuery } from "@apollo/client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Key, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface MESSAGE_INFO {
  context: String;
  reciver: Boolean;
}
interface RECIVEMESSAGE {
  message: String;
  reciverId: String;
  id: String;
}
export default function UserPage() {
  const param = useParams();
  const [userMessage, setUserMessage] = useState<MESSAGE_INFO[]>([]);
  const { data } = useCurrentUser();
  const { data: reciverUser, loading } = useGetUserWithId(param.id as string);
  const [message, setMessage] = useState<string>("");
  const [previousMessage, { data: messageData, loading: messageLoading }] =
    useLazyQuery(GET_PREVIOUS_MESSAGE);
  const [previousMessageData, setPreviousMessage] = useState([]);
  useEffect(() => {
    const scro = document.getElementById("message");
    if (scro) {
      scro.scrollTop = scro.scrollTop + scro.scrollHeight;
    }
  }, [userMessage]);
  if (loading) console.log("useridloading");
  if (reciverUser) console.log("useriddata");
  const { socket } = useSocket();
  useEffect(() => {
    console.log("previous message");
    previousMessage({
      variables: {
        to: param.id,
      },
    }).then((data) => {
      console.log(data?.data?.getPreviousMessage?.reciverMessage);
      setPreviousMessage(data?.data?.getPreviousMessage?.reciverMessage);
    });
  }, []);
  useEffect(() => {}, [socket.on]);
  socket?.on(`${param.id}-${data?.getCurrentUser?.id}`, (temp: string) => {
    console.log(temp);
    setUserMessage([...userMessage, { context: temp, reciver: true }]);
  });
  if (loading) return LoadingUi;

  const sendMessage = (message: String) => {
    setUserMessage([...userMessage, { context: message, reciver: false }]);
    setMessage("");
    socket?.emit("send_message", {
      sender: data?.getCurrentUser?.id,
      reciver: param.id,
      message,
    });

    toast.success("send message");
  };

  // if (messageData) {
  //   const scro = document.getElementById("message");
  //   if (scro) {
  //     scro.scrollTop = scro.scrollTop + scro.scrollHeight;
  //   }
  // }

  return (
    <>
      <div className="h-screen ">
        <div className="flex h-full flex-col justify-between ">
          <div className="flex flex-initial items-center py-2 px-2 gap-4 border-b-[1px] border-gray-600">
            <Image
              alt="user-profile"
              src={reciverUser?.getUserFromId?.profileImageUrl}
              height={30}
              width={30}
              className="rounded-full"
            />
            <span className="text-sm ">
              {`${reciverUser?.getUserFromId?.firstName} ${reciverUser?.getUserFromId?.lastName}`}
            </span>
          </div>
          <div
            id="message"
            className="flex-auto mx-6 my-1 overflow-y-scroll scroll-smooth no-scrollbar"
          >
            {messageLoading
              ? LoadingUi
              : previousMessageData &&
                previousMessageData.map((item: RECIVEMESSAGE) => {
                  return (
                    <div
                      key={item.id as Key}
                      className={`mb-2 ${
                        item.reciverId !== param.id ? "text-left" : "text-right"
                      }`}
                    >
                      <span
                        className={` ${
                          item.reciverId !== param.id
                            ? " bg-white rounded-[6px] text-black px-2 py-1 "
                            : "  rounded-[6px] bg-green-400 text-white px-2 py-1"
                        }  `}
                      >
                        {item.message}
                      </span>{" "}
                    </div>
                  );
                })}
            {userMessage.map((item, key) => {
              return (
                <div
                  key={key}
                  className={`mb-2 ${
                    item.reciver ? "text-left" : "text-right  "
                  }`}
                >
                  <span
                    className={` ${
                      item.reciver
                        ? "text-left bg-white rounded-[6px] text-black px-2 py-1 "
                        : "text-right rounded-[6px] bg-green-400 text-white px-2 py-1 "
                    }`}
                  >
                    {" "}
                    {item.context}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-initial p-3 border-t-[1px] border-gray-600  gap-2 ">
            <input
              id="message-value"
              onChange={(e) => {
                setMessage(e.target?.value);
              }}
              value={message}
              className="text-black rounded-[6px] px-4 w-full"
              type="text"
            />
            <span
              onClick={() => {
                sendMessage(message);
              }}
              className="text-black hover:cursor-pointer bg-white px-3 py-1 rounded-[5px]"
            >
              send
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

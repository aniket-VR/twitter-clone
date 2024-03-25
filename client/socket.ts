import { useMemo } from "react";
import { Socket, io } from "socket.io-client";

export const socketClient = async () => {
  const socket = await io(`https://twitter-clone-server-3emo.onrender.com`, {
    transports: ["websocket"],
  });
  console.log("connecting");
  socket.on("connect", () => {
    console.log("Connected");
  });
  //temp

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return socket;
};

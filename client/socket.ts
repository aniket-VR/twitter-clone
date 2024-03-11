import { useMemo } from "react";
import { Socket, io } from "socket.io-client";

export const socketClient = async () => {
  const socket = await io(`http://localhost:8000`, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return socket;
};

import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type {
  NextApiResponseWithSocket,
  ServerToClientEvents,
  ClientToServerEvents,
} from "@/types/socketCustomTypes";

export default function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const maxClients = 2;
  let activeConnections = 0;
  //  Server intialization

  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(
      res.socket.server
    );

    io.on("connection", (socket) => {
      // Server side Logic
      activeConnections++;
      socket.broadcast.emit("userServerConnection");
      socket.on("sendNotif", (msg) => {
        socket.emit("sendNotif", msg);
      });
      socket.on("sendMsg", (msg, id) => {
        io.to(id).emit("sendNotif", msg);
      });
      socket.on("joinFile", async (id, content) => {
        await socket.join(id);
        const clientsInFile = io.sockets.adapter.rooms.get(id);
        io.to(id).emit("sendNotif", `${content}`);
      });
      socket.on("leaveFile", async (id) => {
        io.to(id).emit("sendNotif", `A user left room ${id}`);
        await socket.leave(id);
      });
      socket.on("disconnect", () => {
        activeConnections--;
        console.log("A user disconnected");
        socket.broadcast.emit("userServerDisconnection", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

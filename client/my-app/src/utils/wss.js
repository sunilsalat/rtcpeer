import io from "socket.io-client";

const SERVER = "http://localhost:5000";

let socket = null;

export const connectWithSocketIoServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    console.log(socket.id);
  });
};

export const createRoom = (identity) => {
  //
  const data = {
    identity,
  };

  socket.emit("create-room", data);
};

export const joinRoom = (identity, roomId) => {
  //
  const data = { identity, roomId };

  socket.emit("join-room", data);
};

require("dotenv").config();
const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const twilio = require("twilio");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());

let connectedUser = [];
let rooms = [{ id: "123", connectedUser: ["alex", "david", "olga"] }];

app.get(`/api/room-exists/:roomId`, async (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);
  if (room) {
    if (room?.connectedUser?.length > 3) {
      return res.status(200).json({ roomExists: true, full: true });
    } else {
      return res.status(200).json({ roomExists: true, full: false });
    }
  } else {
    return res.status(200).json({ roomExists: false });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("create-room", (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("disconnect", () => {
    usreDisconnectHandler(socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    intiConnectionHandler(data, socket);
  });
});

const createNewRoomHandler = (data, socket) => {
  const { identity } = data;
  const roomId = uuidv4();
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };
  connectedUser = [...connectedUser, newUser];
  // craete new room
  const newRoom = {
    id: roomId,
    connectedUser: [newUser],
  };
  // join socke.io room
  socket.join(roomId);
  rooms = [...rooms, newRoom];
  // emit to the client who create room and pass roomId
  socket.emit("room-id", { roomId });
  socket.emit("room-update", { connectedUser: newRoom.connectedUser });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };

  const room = rooms.find((room) => room.id === roomId);
  room.connectedUser = [...room.connectedUser, newUser];
  socket.join(roomId); // join socket to room
  connectedUser = [...connectedUser, newUser];

  room.connectedUser.forEach((user) => {
    /* emit an event to individul user in the room and ask them to prepate for RTCPeerConnection
       and send socket id of user who have newly/current joined 
    */
    if (user.socketId !== socket.id) {
      const data = {
        /* connectedUserId is of curretn user who is joining */
        connectedUserId: socket.id,
      };
    }

    io.to(user.socketId).emit("conn-prepare", data);
  });

  io.to(roomId).emit("room-update", { connectedUser: room.connectedUser });
};

const usreDisconnectHandler = (socket) => {
  const user = connectedUser.find((user) => user.socketId === socket.id);
  const room = rooms.find((room) => room.id === user.roomId);
  room.connectedUser = room.connectedUser.filter(
    (user) => user.socketId !== socket.id
  );

  socket.leave(user.roomId);
  if (room.connectedUser.length > 0) {
    io.to(room.id).emit("room-update", { connectedUser: room.connectedUser });
  } else {
    rooms = rooms.filter((r) => r.id !== room.id);
  }

  // TODO--handler later remove room if no one exists
};

const signalingHandler = (data, socket) => {
  const { connectedUserId, signal } = data;
  const signalingData = { signal, connectedUserId: socket.id };
  /* exchanging data , receiving form remote peer and 
  sendign back to the newly joined user to the room   */
  io.to(connectedUserId).emit("conn-signal", signalingData);
};

const intiConnectionHandler = (data, socket) => {

  const {connectedUserId} = data

  const initData = {connectedUserId:socket.id}

  io.to(connectedUserId).emit('conn-init', initData)

};

server.listen(port, () => console.log(`server running on ${port}`));

import io from "socket.io-client";
import { setParticipants, setRoomId } from "../slices/BaseSlice";
import {
  prepareNewPeerConnection,
  handleSignalingData,
} from "./webRTCHandler.js";

const SERVER = "http://localhost:5000";
let socket = null;

export const connectWithSocketIoServer = (dispatch) => {
  socket = io(SERVER);
  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUser } = data;
    dispatch(setParticipants(connectedUser));
  });

  socket.on("conn-prepare", (data) => {
    console.log('inside connection prepare')
    /* connectedUserId is socket.id of newly joined user */
    const { connectedUserId } = data;
    console.log('coon-prepare', connectedUserId)
    prepareNewPeerConnection(connectedUserId, false);

    socket.emit("conn-init", data);
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connecteUserId } = data;
    prepareNewPeerConnection(connecteUserId, true);
  });
};

export const createRoom = (identity) => {
  const data = {
    identity,
  };
  socket.emit("create-room", data);
};

export const joinRoom = (identity, roomId) => {
  const data = { identity, roomId };
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

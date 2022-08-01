import * as wss from "./wss";
import Peer from "simple-peer";

let localStream;

export const initRtcConnection = async (isHost, identity, roomId) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      localStream = stream;
      localMediaPreview(localStream);
      isHost ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log(err);
      console.log("Some error couured!, Please try again later");
    });
};

const localMediaPreview = async (stream) => {
  const localVideo = document.getElementById("local-video");
  console.log(localVideo, "local video23");
  localVideo.srcObject = stream;
};

let peers = {};
let streams = [];
const getConfiguration = () => {
  return {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
};

export const prepareNewPeerConnection = async (
  connectedUserId,
  isInitiator
) => {
  const configuration = getConfiguration();
  peers[connectedUserId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connectedUserId].on("signal", (data) => {
    // we will get offer, answer, all sdp data, all ice candidate data
    const signalData = {
      signal: data,
      connectedUserId: connectedUserId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connectedUserId].on("stream", (stream) => {
    console.log("new stream came");
    addStream(stream, connectedUserId);
    streams = [...streams, stream];
  });
};

const addStream = (stream, connectedUserId) => {
  // display incoming stream
};

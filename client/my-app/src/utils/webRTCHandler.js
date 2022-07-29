import * as wss from "./wss";

export const initRtcConnection = async (isHost, identity, roomId) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      localMediaPreview(stream);
      isHost ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log("Some error couured!, Please try again later");
    });
};

const localMediaPreview = (stream) => {
  const localVideo = document.getElementById("local-video");
  localVideo.srcObject = stream;
};

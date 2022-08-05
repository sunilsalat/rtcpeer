import * as wss from "./wss";
import Peer from "simple-peer";

let localStream;

export const initRtcConnection = async (isHost, identity, roomId) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);
      isHost ? wss.createRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log(err);
      console.log("Some error couured!, Please try again later");
    });
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
  console.log(connectedUserId, "connectes456");

  const configuration = getConfiguration();
  peers[connectedUserId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  // if isInitiator true, peer will start listening to signal
  peers[connectedUserId].on("signal", (data) => {
    /* Fired when the peer wants to send signaling data to the remote peer. */
    // we will get offer, answer, all sdp data, all ice candidate data
    const signalData = {
      signal: data,
      connectedUserId: connectedUserId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connectedUserId].on("stream", (stream) => {
    /* will be receiving stream form other users in future */
    console.log("new stream came");
    addStream(stream, connectedUserId);
    streams = [...streams, stream];
  });
};

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElemet = document.createElement("video");
  videoElemet.autoplay = true;
  videoElemet.muted = true;
  videoElemet.srcObject = stream;

  videoElemet.onloadedmetadata = () => {
    videoElemet.play();
  };

  

  videoContainer.appendChild(videoElemet);
  videosContainer.appendChild(videoContainer);
};

export const handleSignalingData = (data) => {
  console.log("inside handleSingnalign function ");
  // add singnlaing data to peer connection
  // signaling back to the remote peer from the here newly joined user
  peers[data.connectedUserId].signal(data.signal);
};

const addStream = (stream, connectedUserId) => {
  console.log("inside new strem acma esdfsdf");
  // display incoming stream
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connectedUserId;
  videoContainer.classList.add("video_track_container");
  const videoElemet = document.createElement("video");
  videoElemet.autoplay = true;
  videoElemet.srcObject = stream;

  videoElemet.id = `${connectedUserId}-video`;

  videoElemet.onloadedmetadata = () => {
    videoElemet.play();
  };

  videoElemet.addEventListener("click", () => {
    if (videoElemet.classList.contains("full_screen")) {
      videoElemet.classList.remove("full_screen");
    } else {
      videoElemet.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElemet);
  videosContainer.appendChild(videoContainer);
};

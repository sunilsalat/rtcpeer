import ChatSection from "./ChatSection";
import Participant from "./Participant";
import "./Room.css";
import RoomLabel from "./RoomLabel";
import { useSelector } from "react-redux";
import VideoSection from "./videoSection/VideoSection";
import { useEffect } from "react";
import OverLay from "./OverLay";
import { initRtcConnection } from "../../utils/webRTCHandler.js";

const RoomPage = () => {
  const { roomId, identity, isHost, isAwaiting } = useSelector(
    (state) => state.baseSlice
  );

  useEffect(() => {
    initRtcConnection(isHost, identity, roomId);
  }, []);

  return (
    <div className="room_container">
      <Participant />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {isAwaiting && <OverLay />}
    </div>
  );
};

export default RoomPage;

import ChatSection from "./ChatSection";
import Participant from "./Participant";
import "./Room.css";
import RoomLabel from "./RoomLabel";
import {useSelector} from 'react-redux'
import VideoSection from "./videoSection/VideoSection";

const RoomPage = () => {

  const {roomId}  = useSelector(state=>state.baseSlice)

  return (
    <div className="room_container">
      <Participant />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  );
};

export default RoomPage;

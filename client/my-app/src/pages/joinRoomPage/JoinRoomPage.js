import "./JoinRoomPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHost, getRoomExists } from "../../slices/BaseSlice";
import JoinRoomContent from "./components/JoinRoomContent";
import JoinRoomButtons from "./components/joinRoomButton";

const JoinRoomPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { isHost, error, isAwaiting, roomExists } = useSelector(
    (state) => state.baseSlice
  );
  const [roomId, setRoomId] = useState();
  const [name, setName] = useState("");

  const handleJoinRoom = async () => {
    dispatch(getRoomExists(roomId));
  };

  const joinRoom = () => {
    if (roomExists) {
      console.log("room Exists");
    }
  };

  const createRoom = () => {};

  useEffect(() => {
    const isHost = new URLSearchParams(search).get("host");
    if (isHost) {
      dispatch(setHost(true));
    }
  }, []);

  if (isAwaiting) {
    return (
      <h1 style={{ position: "absolute", marginTop: "50%", marginLeft: "50%" }}>
        Loading....
      </h1>
    );
  }

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <p className="join_room_title">
          {isHost ? "Host Meeting" : "Join Meeting"}
        </p>
        <JoinRoomContent
          roomId={roomId}
          setRoomId={setRoomId}
          name={name}
          setName={setName}
        />
        {error ? <p>{error}</p> : ""}
        <JoinRoomButtons handleJoinRoom={handleJoinRoom} isHost={isHost} />
      </div>
    </div>
  );
};

export default JoinRoomPage;

import "./JoinRoomPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setHost,
  getRoomExists,
  setIdentity,
  setRoomId,
} from "../../slices/BaseSlice";
import JoinRoomContent from "./components/JoinRoomContent";
import JoinRoomButtons from "./components/joinRoomButton";

const JoinRoomPage = () => {
  const [roomId, addRoom] = useState("");
  const [name, setName] = useState("");
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isHost,
    error,
    isAwaiting,
    roomExists,
    isFull: full,
  } = useSelector((state) => state.baseSlice);

  const handleJoinRoom = async () => {
    dispatch(setIdentity(name));
    if (isHost) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  const joinRoom = () => {
    dispatch(getRoomExists(roomId)).then((e) => {
      if (e.payload.roomExists) {
        if (e.payload.full) {
          console.log("Room is full !, Please try again later");
        } else {
          dispatch(setRoomId(roomId));
          navigate("/room");
        }
      } else {
        console.log("Room with given id does not exists!!");
      }
    });
  };

  const createRoom = () => {
    navigate("/room");
  };

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
          addRoom={addRoom}
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

import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectingButton from "./ConnectingButton";

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const PushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="join a meeting"
        onClickHandler={() => {
          pushToJoinRoomPage();
        }}
      />

      <ConnectingButton
        createRoomButton
        buttonText="host a meeting"
        onClickHandler={() => {
          PushToJoinRoomPageAsHost();
        }}
      />
    </div>
  );
};

export default ConnectingButtons;

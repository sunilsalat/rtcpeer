import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isWithAudioOnly } from "../../../slices/BaseSlice";

const JoinRoomContent = ({ roomId, addRoom, name, setName }) => {
  const { isHost } = useSelector((state) => state.baseSlice);
  const dispatch = useDispatch();

  const handleOnlyWithAudio = (e) => {
    if (e.target.checked) {
      dispatch(isWithAudioOnly(true));
    } else {
      dispatch(isWithAudioOnly(false));
    }
  };

  return (
    <div className="join_room_inputs_container">
      {!isHost && (
        <input
          className="join_room_input"
          type="text"
          placeholder=" Enter roomId"
          value={roomId}
          onChange={(e) => addRoom(e.target.value)}
        ></input>
      )}
      <input
        className="join_room_input"
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label id="only audio">Only Audio</label>
      <input
        type="checkbox"
        id="only audio"
        onChange={(e) => handleOnlyWithAudio(e)}
      ></input>
    </div>
  );
};

export default JoinRoomContent;

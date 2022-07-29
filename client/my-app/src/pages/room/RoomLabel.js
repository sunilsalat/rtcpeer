import React from "react";

function RoomLabel({ roomId }) {
  return (
    <div className="room_label">
      <p className="room_label_paragraph" >room label-{roomId}</p>
    </div>
  );
}

export default RoomLabel;

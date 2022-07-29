import React from "react";

function LeaveRoomButton() {
  const handleRoomDisconnect = () => {
    const siteUrl = window.location.origin;

    window.location.href = siteUrl;
  };

  return (
    <div className="video_button_container">
      <button
        className="video_button_end"
        onClick={() => {
          handleRoomDisconnect();
        }}
      >
        Leave Room
      </button>
    </div>
  );
}

export default LeaveRoomButton;

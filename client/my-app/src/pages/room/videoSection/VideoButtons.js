import React from "react";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import SwithToScreenShareButton from "./SwithToScreenShareButton";

function VideoButtons() {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CameraButton />
      <LeaveRoomButton />
      <SwithToScreenShareButton />
    </div>
  );
}

export default VideoButtons;

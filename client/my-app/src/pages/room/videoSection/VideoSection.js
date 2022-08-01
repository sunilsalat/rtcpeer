import React from "react";
import VideoButtons from "./VideoButtons";

function VideoSection() {
  return (
    <div className="video_section_container">
      <video id="local-video"></video>
      <VideoButtons />
    </div>
  );
}

export default VideoSection;

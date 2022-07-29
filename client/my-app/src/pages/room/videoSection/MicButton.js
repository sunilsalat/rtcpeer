import React, { useState } from "react";

import micoff from "../../../resources/images/micOff.svg";
import mic from "../../../resources/images/mic.svg";

function MicButton() {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? micoff : mic}
        onClick={() => handleMicButtonPressed()}
        className="video_button_image"
      />
    </div>
  );
}

export default MicButton;

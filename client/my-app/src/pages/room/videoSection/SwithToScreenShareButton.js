import React, { useState } from "react";
import SwitchImg from "../../../resources/images/switchToScreenSharing.svg";

function SwithToScreenShareButton() {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);

  const handleToggle = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <div className="video_button_container">
      <img
        className="video_button_image"
        src={SwitchImg}
        onClick={() => {
          handleToggle();
        }}
      />
    </div>
  );
}

export default SwithToScreenShareButton;

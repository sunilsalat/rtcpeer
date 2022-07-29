import React, { useState } from "react";
import cameraoff from "../../../resources/images/cameraOff.svg";
import camera from "../../../resources/images/camera.svg";

function CameraButton() {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisabled ? cameraoff : camera}
        onClick={() => setIsLocalVideoDisabled(!isLocalVideoDisabled)}
      />
    </div>
  );
}

export default CameraButton;

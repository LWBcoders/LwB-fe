import React from "react";

const VideoPlayer = ({ user, showCamera, cameraStatus }) => {
  return (
    <div>
      {cameraStatus && showCamera ? (
        <video
          ref={(ref) => ref && user.videoTrack.play(ref)}
          autoPlay={true}
          playsInline={true}
        />
      ) : (
        <div style={{ backgroundColor: "black", color: "white" }}>
          Camera Off
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

import React, { useEffect } from "react";
import LifeLostGif from "../../../assets/Comp 1_1.gif";

const VideoPlayer = ({ onVideoEnded }) => {
  const gifDuration = 1300; // replace with your gif duration in milliseconds

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Here");
      if (onVideoEnded) {
        onVideoEnded();
      }
    }, gifDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [onVideoEnded, gifDuration]);

  return (
    <img
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 150,
        height: 150,
      }}
      src={LifeLostGif}
      alt="Video content"
    />
  );
};

export default VideoPlayer;

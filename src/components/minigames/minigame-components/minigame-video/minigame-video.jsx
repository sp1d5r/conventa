import React, { useState, useEffect, useRef } from "react";
import "./minigame-video.css";
import Skip from "../../../../assets/catch-a-liar/skip.svg";
import Play from "../../../../assets/catch-a-liar/play.svg";
import Replay from "../../../../assets/catch-a-liar/replay.svg";

// const useImage = ({ src }) => {
//   const [loaded, setLoaded] = useState(false);
//
//   useEffect(() => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => setLoaded(true);
//   }, [src]);
//
//   return loaded;
// };

const MinigameVideo = ({ src, alt, loopTimes, pause, updateQuestions }) => {
  const [loaded, setLoaded] = useState(false);
  const [videoState, setVideoState] = useState({
    loopsRemaining: loopTimes,
    videoEnded: true,
  });
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (videoState.loopsRemaining > 0) {
      console.log(videoState.loopsRemaining - 1);
      setVideoState((prevState) => ({
        loopsRemaining: prevState.loopsRemaining - 1,
        videoEnded: true,
      }));
      videoRef.current.currentTime = 0;
    } else {
      setVideoState((prevState) => ({
        loopsRemaining: prevState.loopsRemaining,
        videoEnded: true,
      }));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (pause) {
      video.pause();
    } else {
      video.play();
    }
  }, [pause]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  const displayVideoEnd = () => {
    if (videoState.loopsRemaining === 0) {
      return (
        <div className={"minigame-transition-div"}>
          <p className={"minigame-video-main-text"}>It's Decision Time!</p>
          <p>What do you think? Truth or Lie?</p>
          <button className={"minigame-buttons"} onClick={updateQuestions}>
            <img src={Skip} alt={"play"} />
            <p>Skip</p>
          </button>
        </div>
      );
    } else if (videoState.loopsRemaining === loopTimes) {
      return (
        <div className={"minigame-transition-div"}>
          <p className={"minigame-video-main-text"}>Begin!</p>
          <p>
            You will have {videoState.loopsRemaining} attempts to determine if
            the person is lying or not.
          </p>
          <button
            className={"minigame-buttons"}
            onClick={() => {
              setVideoState({
                loopsRemaining: videoState.loopsRemaining,
                videoEnded: false,
              });
              videoRef.current.play();
            }}
          >
            <img src={Play} alt={"play"} />
            <p>Play</p>
          </button>
        </div>
      );
    } else {
      return (
        <div className={"minigame-transition-div"}>
          <p className={"minigame-video-main-text"}>
            {videoState.loopsRemaining} attempts remaining
          </p>
          <p>Not sure? Press replay</p>
          <div className={"minigame-button-divs"}>
            <button
              className={"minigame-buttons"}
              onClick={() => {
                setVideoState({
                  loopsRemaining: videoState.loopsRemaining,
                  videoEnded: false,
                });
                videoRef.current.play();
              }}
            >
              <img src={Replay} alt={"play"} />
              <p>Replay Video</p>
            </button>
            <button
              className={"minigame-buttons"}
              onClick={() => {
                updateQuestions();
              }}
            >
              <img src={Skip} alt={"play"} />
              <p>Skip</p>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ position: "relative", width: "90%", height: "90%" }}>
      <video
        className={`mingame-video-act ${loaded ? "loaded" : ""}`}
        alt={alt}
        id="myVideo"
        key={src}
        ref={videoRef}
        onEnded={handleVideoEnd}
        style={{ display: videoState.videoEnded ? "none" : "block" }}
      >
        <source src={src} type="video/mp4" />
        This browser doesn't support the video tag.
      </video>
      {videoState.videoEnded && displayVideoEnd()}
    </div>
  );
};

export default MinigameVideo;

import "./testing.css";
import React, { useState, useEffect, useRef } from "react";
import Play from "../../assets/catch-a-liar/play.svg";
import Skip from "../../assets/catch-a-liar/skip.svg";
import Replay from "../../assets/catch-a-liar/replay.svg";

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
          It's Decision Time!
          <button className={"minigame-buttons"} onClick={updateQuestions}>
            <img src={Skip} alt={"play"} />
          </button>
        </div>
      );
    } else if (videoState.loopsRemaining === loopTimes) {
      return (
        <div className={"minigame-transition-div"}>
          Begin!
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
          </button>
        </div>
      );
    } else {
      return (
        <div className={"minigame-transition-div"}>
          {videoState.loopsRemaining} attempts remaining
          <div>
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
            </button>
            <button
              className={"minigame-buttons"}
              onClick={() => {
                updateQuestions();
              }}
            >
              <img src={Skip} alt={"play"} />
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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

function Testing({ testing }) {
  const [_currentQuestion, _setCurrentQuestion] = useState({
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FPointCrow%20-%20True%202.mp4?alt=media&token=b196f81e-68c4-4e3c-a4d4-827b1d46b260",
  });

  return (
    <div style={{ padding: 20 }}>
      {testing ? (
        <div>
          <p>We're testing components here</p>
          <div className={"testing-container"}>
            <MinigameVideo
              src={_currentQuestion.videoUrl}
              id="first-impressions-images"
              alt="Girl in a jacket"
              updateQuestions={() => {
                _setCurrentQuestion({
                  videoUrl:
                    "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FPointCrow%20-%20Lie%208.mp4?alt=media&token=a0477936-cd52-4733-b78d-0b9cbbf84807",
                });
              }}
              loopTimes={3}
              pause={true}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>How'd you get here fella?</p>
          <p>
            I think its time you went back somewhere more interesting... this is
            just for testing purposes
          </p>
        </div>
      )}
    </div>
  );
}

export default Testing;

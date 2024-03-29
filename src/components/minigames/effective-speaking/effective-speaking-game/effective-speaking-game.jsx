import React, { useEffect, useState } from "react";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";
import "./effective-speaking-game.css";
import { ListGroup } from "react-bootstrap";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";

function EffectiveSpeakingGame({
  setGameState,
  difficulty,
  timer,
  topics,
  topicName,
}) {
  const [topicTime, setTopicTime] = useState(timer);
  const [paused, setPause] = useState(false);
  const secondsPerTopic = timer / topics.length;
  const [topicsShown, setTopicsShown] = useState(0);
  const [instructions, setInstructions] = useState(true);

  /* ------ PAUSE SCREEN LOGIC ------ */
  const hidePauseScreen = () => {
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = true;
  };

  const showPauseScreen = () => {
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = false;
  };

  const pressPause = () => {
    if (!paused) {
      showPauseScreen();
    } else {
      hidePauseScreen();
    }
    setPause(!paused);
  };

  const updateQuestion = () => {
    setGameState(0);
  };

  const updateTopicTime = (topicTime) => {
    // console.log(topics.length - parseInt(topicTime / secondsPerTopic))
    setTopicsShown(topics.length - parseInt(topicTime / secondsPerTopic));
    if (topicTime <= 0) {
      setGameState(2);
    }
    return topicTime - 1;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && !instructions) {
        setInstructions(false);
        setTopicsShown(0);
        setTopicTime((topicTime) => updateTopicTime(topicTime));
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [paused, secondsPerTopic]);

  return (
    <MinigameMain
      pauseGame={pressPause}
      updateQuestion={updateQuestion}
      title={"Effective Speaking"}
      skipable={true}
    >
      <div className={"effective-speaking-game-main"}>
        {
          /* This is the Paused Screen */
          <PausedScreen
            gameTitle={"To Catch A Liar"}
            text1={
              "You will have a looping video playing, your job is to determine if the person in the video is telling the truth or not."
            }
            example={"“I never once *rubs nose* lied in my life.”"}
            text2={
              "You will be presented with `Truth` and `Lie` pick the correct option for a point"
            }
            timeSpent={0}
            score={0}
            totalQuestions={0}
            pressPause={() => {
              pressPause();
            }}
            quitGame={() => {
              setGameState(0);
            }}
          />
        }
        {
          /* This is the End Screen */
          <GameOverScreen
            style={{ top: "0vh" }}
            timeSpent={"don't worry bout it sweetheart..."}
            score={0}
            totalQuestions={0}
            resetGame={() => {
              setGameState(0);
            }}
            leaveGame={() => {
              setGameState(0);
            }}
          />
        }

        <p>Topic Name: {topicName}</p>
        <div className={"effective-speaking-timer-svg"}>
          <div style={{ display: "flex" }}>
            <div className={"effective-speaking-timer-div "}>
              <svg className="circular-loader" viewBox="50 50 50 50">
                {/* circumference 62.8*/}

                <circle
                  className="loader-path"
                  cx="75"
                  cy="75"
                  r="20"
                  fill="none"
                  stroke={"#000000"}
                  strokeWidth={"4px"}
                ></circle>
                <circle
                  className="loader-path"
                  cx="75"
                  cy="75"
                  r="20"
                  fill="none"
                  stroke="#9cc6ff"
                  strokeDasharray={20 * Math.PI * 2}
                  strokeDashoffset={
                    20 * Math.PI * 2 * ((timer - topicTime) / timer)
                  }
                ></circle>
                <text
                  x="75"
                  y="80"
                  fontFamily={"Lexend"}
                  fill={"#000000"}
                  fontSize={"15px"}
                  textAnchor={"middle"}
                >
                  {topicTime}
                </text>
              </svg>
            </div>
            <div className={"microphone-div"}></div>
          </div>
        </div>

        <div className={"effective-speaking-list-group-divs"}>
          <p>Incorporate the words below in the speech below:</p>
          <ListGroup className={"effective-speaking-list-group"}>
            {!paused &&
              topics &&
              topics.map((item, index) => {
                if (index < topicsShown) {
                  return (
                    <ListGroup.Item
                      active
                      className={"effective-speaking-list-group"}
                    >
                      {item}
                    </ListGroup.Item>
                  );
                } else {
                  return (
                    <ListGroup.Item className={"effective-speaking-list-group"}>
                      _
                    </ListGroup.Item>
                  );
                }
              })}
          </ListGroup>
        </div>
      </div>
    </MinigameMain>
  );
}

export default EffectiveSpeakingGame;

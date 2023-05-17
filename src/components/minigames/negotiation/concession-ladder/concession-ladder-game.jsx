import React, { useState, useEffect } from "react";
import Timer from "../../minigame-components/timer/timer";
import "./concessions-ladder.css";
import NegotiationSlider from "../../minigame-components/slider/negotiation-slider";
import ScrollToTop from "../../../routing/scroll-to-top";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";
import { getConcessionsLadderMinigameData } from "../../../../cloud-infrastructure/firebase/firebase";

function ConcessionLadderGame({ setGameState, time }) {
  const [step, setStep] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [pause, setPause] = useState(false);
  const [concessionDetails, setConcessionDetails] = useState({
    title: "Loading",
    description: "Loading",
    concessionPoints: [],
  });

  function getRandomTip() {
    const tips = [
      "Are you making sure to prioritize the most important concession points?",
      "You want to make sure you're using the timer effectively to build pressure.",
      "Don't forget to think about the trade-offs between different concession points.",
      "Consider the other party's interests when making concessions.",
      "Are you making sure to maintain a balance between giving and receiving?",
      "You want to make sure you're pacing your concessions to avoid giving up too much too soon.",
      "Remember that making small concessions can help build trust and rapport.",
      "Consider using conditional concessions to elicit a response from the other party.",
      "Are you making sure to leverage your strengths and minimize your weaknesses?",
      "You want to make sure you're aware of the other party's priorities and limitations.",
      "Don't forget to be creative in finding solutions that satisfy both parties.",
      "Consider exploring multiple options before settling on a final agreement.",
      "Are you making sure to be assertive in expressing your needs and interests?",
      "You want to make sure you're managing your body language and tone during negotiations.",
      "Remember to stay flexible and adapt your strategy as the negotiation progresses.",
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  }

  useEffect(() => {
    if (
      concessionDetails &&
      step > 0 &&
      step <= concessionDetails.concessionPoints.length
    ) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, time * 1000);

      return () => clearTimeout(timer);
    }
  }, [time, step, concessionDetails]);

  useEffect(() => {
    getConcessionsLadderMinigameData()
      .then((fetchedDetails) => {
        console.log("here");
        setConcessionDetails({ ...fetchedDetails });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleExit = () => {
    setGameState(0);
  };

  const nextConcession = () => {
    setStep(step + 1);
  };

  const resetGame = () => {
    setStep(0);
    setPause(false);

    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();
  };

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
    if (!pause) {
      showPauseScreen();
    } else {
      hidePauseScreen();
    }
    setPause(!pause);
  };

  /* ------ END SCREEN LOGIC ------ */
  const quitGame = () => {
    setPause(true);
    hidePauseScreen();
    unhideEndScreen();
  };

  const hideEndScreen = () => {
    var endMessage = document.getElementById("end-message");
    endMessage.hidden = true;
  };

  const unhideEndScreen = () => {
    var endMessage = document.getElementById("end-message");
    endMessage.hidden = false;
  };

  return (
    <div className="negotiation-roleplay-minigame">
      <MinigameMain
        pauseGame={pressPause}
        skipable={false}
        updateQuestion={() => {}}
        title={"Concession Ladder"}
      >
        {
          /* This is the Paused Screen */
          <PausedScreen
            gameTitle={"Concession Ladder"}
            text1={
              "You will be presented with a series of statements from a negotiation partner."
            }
            example={"“I'm feeling overwhelmed with this project.”"}
            text2={
              "Select the most empathetic response from the options given to gain points."
            }
            score={0}
            totalQuestions={0}
            pressPause={() => {
              pressPause();
            }}
            quitGame={() => {
              quitGame();
            }}
          />
        }
        {
          /* This is the End Screen */
          <GameOverScreen
            timeSpent={"You did great!"}
            score={0}
            totalQuestions={0}
            resetGame={() => {
              resetGame();
            }}
            leaveGame={() => {
              console.log("pressed quit");
              setGameState(0);
            }}
            gameOverText={`Concession Tip: ${getRandomTip()}`}
          />
        }
        <ScrollToTop />
        {step === 0 ? (
          <div className={"concessions-game-container"}>
            <h3 className={"concessions-header"}>{concessionDetails.title}</h3>
            <p className={"concessions-text"}>
              {concessionDetails.description}
            </p>
            <button onClick={nextConcession} className={"concessions-button"}>
              Start
            </button>
          </div>
        ) : step <= concessionDetails.concessionPoints.length ? (
          <div className={"concessions-game-container"}>
            <h2 className={"concessions-subheader"}>
              {concessionDetails.concessionPoints[step - 1].title}
            </h2>
            <NegotiationSlider
              min={concessionDetails.concessionPoints[step - 1].min}
              max={concessionDetails.concessionPoints[step - 1].max}
              step={concessionDetails.concessionPoints[step - 1].step}
              value={sliderValue}
              onChange={setSliderValue}
            />
            <div className="timer-container">
              <Timer
                key={step}
                initialTime={time}
                onFinish={nextConcession}
                isPaused={pause}
              />
            </div>
            <button className={"concessions-button"} onClick={nextConcession}>
              Next Concession
            </button>
          </div>
        ) : (
          <div className={"concessions-game-container"}>
            <h1 className={"concessions-header"}>Finished!</h1>
            <p className={"concessions-text"}>Congrats! </p>
            <p className={"concessions-text"}>Tip: {getRandomTip()}</p>
            <button onClick={handleExit} className={"concessions-button"}>
              Exit
            </button>
          </div>
        )}
      </MinigameMain>
    </div>
  );
}

export default ConcessionLadderGame;

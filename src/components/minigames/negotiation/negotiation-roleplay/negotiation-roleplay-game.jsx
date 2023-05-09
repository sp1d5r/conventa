import React, { useState, useEffect } from "react";
import Timer from "../../minigame-components/timer/timer";
import "../shared.css";
import ScrollToTop from "../../../routing/scroll-to-top";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";

function NegotiationRoleplayGame({ setGameState, time }) {
  const [step, setStep] = useState(0);
  const [pause, setPause] = useState(false);

  const [role, setRole] = useState(null);

  const roleplayData = {
    title: "Car Negotiation Roleplay",
    description:
      "Choose a role (Car Seller or Car Buyer) and practice negotiating from that perspective. Periodically, you will be shown prompts related to your role to help you adapt your negotiation strategy.",
    sellerRole: "Car Seller",
    buyerRole: "Car Buyer",
    sellerPrompts: [
      "Highlight the car's excellent maintenance history.",
      "Mention that you have another interested buyer.",
      "Offer to include a set of winter tires as part of the deal.",
    ],
    buyerPrompts: [
      "Bring up a recent price drop in the used car market.",
      "Point out a minor cosmetic issue with the car.",
      "Share that you're prepared to close the deal today if the price is right.",
    ],
  };

  const prompts =
    role === roleplayData.sellerRole
      ? roleplayData.sellerPrompts
      : roleplayData.buyerPrompts;

  useEffect(() => {
    if (step > 0 && step <= prompts.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, time * 1000);

      return () => clearTimeout(timer);
    }
    if (step > prompts.length) {
      quitGame();
    }
  }, [step, prompts.length, time]); // eslint-disable-line

  const nextPrompt = () => {
    setStep(step + 1);
  };

  const chooseRole = (selectedRole) => {
    setRole(selectedRole);
    setStep(1);
  };

  function getRandomTip() {
    const tips = [
      "Are you making sure to establish rapport with the other party?",
      "You want to make sure you're practicing active listening.",
      "Don't forget to communicate your needs and interests clearly.",
      "Consider using open-ended questions to gather more information.",
      "Are you making sure to identify common ground and shared interests?",
      "You want to make sure you're focusing on the problem, not the person.",
      "Remember to separate your emotions from the negotiation process.",
      "Consider exploring multiple options before settling on an agreement.",
      "Are you making sure to prioritize the most important issues?",
      "You want to make sure you're keeping an open mind to different solutions.",
      "Don't forget to be patient and take breaks when needed.",
      "Consider the other party's perspective to better understand their needs.",
      "Are you making sure to be assertive without being aggressive?",
      "You want to make sure you're managing your body language and tone.",
      "Remember to stay flexible and adapt your strategy when necessary.",
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  }

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
    <div className="negotiation-roleplay-game">
      <MinigameMain
        pauseGame={pressPause}
        skipable={false}
        updateQuestion={() => {}}
        title={"Negotiation Minigame"}
      >
        {
          /* This is the Paused Screen */
          <PausedScreen
            gameTitle={"Empathy Challenge"}
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
            gameOverText={`Negotiation Tip: ${getRandomTip()}`}
          />
        }
        <ScrollToTop />
        {step === 0 ? (
          <div className={"negotiation-game-container"}>
            <h1 className={"negotiation-header"}>{roleplayData.title}</h1>
            <p className={"negotiation-text"}>{roleplayData.description}</p>
            <button
              className={"negotiation-button"}
              onClick={() => chooseRole(roleplayData.sellerRole)}
            >
              {roleplayData.sellerRole}
            </button>
            <button
              className={"negotiation-button"}
              onClick={() => chooseRole(roleplayData.buyerRole)}
            >
              {roleplayData.buyerRole}
            </button>
          </div>
        ) : step <= prompts.length ? (
          <div className={"negotiation-game-container"}>
            <h2 className={"negotiation-header"}>You are : {role}</h2>
            <h2 className={"negotiation-subheader"}>{prompts[step - 1]}</h2>
            <div className="timer-container">
              <Timer
                key={step}
                initialTime={time}
                onFinish={nextPrompt}
                isPaused={pause}
              />
            </div>
            <button className={"negotiation-button"} onClick={nextPrompt}>
              Next Prompt
            </button>
          </div>
        ) : (
          <></>
        )}
      </MinigameMain>
    </div>
  );
}

export default NegotiationRoleplayGame;

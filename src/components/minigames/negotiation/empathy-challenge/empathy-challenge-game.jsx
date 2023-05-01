import React, { useState, useEffect } from "react";
import "./empathy-challenge.css";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";

const NUMBER_OF_QUESTIONS = 10;

const empathyChallengeQuestions = [
  {
    id: 1,
    statement: "I'm feeling really stressed about this project deadline.",
    options: [
      "Well, you should have started earlier.",
      "Maybe you should take a break.",
      "I understand, deadlines can be stressful. How can I help?",
    ],
    correctOption: 2,
  },
  {
    id: 2,
    statement: "I can't believe I lost my job. I don't know what to do.",
    options: [
      "That's tough, I'm here for you if you need to talk.",
      "You'll find something better soon.",
      "At least you have more free time now.",
    ],
    correctOption: 0,
  },
  {
    id: 3,
    statement: "I'm feeling really overwhelmed with all the work I have to do.",
    options: [
      "You should work harder.",
      "Maybe you should prioritize your tasks and focus on one thing at a time.",
      "It's not that big of a deal, just relax.",
    ],
    correctOption: 1,
  },
  // ... more questions
];

function EmpathyChallengeGame({ setGameState, difficulty }) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrent] = useState({});
  const [questions, setQuestions] = useState([]);
  const [pause, setPause] = useState(false);

  /* Question Logic */

  const updateQuestion = () => {
    const [first, ...remaining] = [...questions];
    if (first !== undefined) {
      setQuestions(remaining);
      setCurrent(first);
    } else {
      /* Game Over */
      console.log("quit game");
      quitGame();
    }
  };

  const getQuestions = async () => {
    // Replace this with a function that fetches questions for the Empathy Challenge
    const fetchedQuestions = empathyChallengeQuestions; //await fetchEmpathyChallengeItems(NUMBER_OF_QUESTIONS);
    setQuestions(fetchedQuestions);
    setCurrent(fetchedQuestions[0]);
  };

  const resetGame = () => {
    getQuestions();
    setPause(false);

    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();
  };

  /* Handle Scores */
  const increaseScore = () => {
    setScore(score + 1);
  };

  useEffect(() => {
    console.log("here");
    getQuestions();
  }, []);

  /* ------ RESPONSE ANALYSIS ------- */
  const clickOption = (optionNumber) => {
    if (optionNumber === currentQuestion.correctOption) {
      increaseScore();
    }
    updateQuestion();
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
    <MinigameMain
      pauseGame={pressPause}
      updateQuestion={updateQuestion}
      title={"Empathy Challenge"}
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
          pressPause={() => {
            pressPause();
          }}
          quitGame={() => {
            console.log("pressed quit");
            setGameState(0);
          }}
        />
      }
      {
        /* This is the End Screen */
        <GameOverScreen
          timeSpent={"You did great!"}
          score={score}
          totalQuestions={NUMBER_OF_QUESTIONS}
          resetGame={() => {
            resetGame();
          }}
          leaveGame={() => {
            console.log("pressed quit");
            setGameState(0);
          }}
        />
      }
      <div className={"empathy-challenge-game-cards"}>
        <div className={"empathy-challenge-card-main"}>
          <div className={"empathy-challenge-statement"}>
            <p>{currentQuestion ? currentQuestion.statement : ""}</p>
          </div>
          <div className={"empathy-challenge-options"}>
            {currentQuestion.options &&
              currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={"empathy-challenge-option"}
                  onClick={() => {
                    clickOption(index);
                  }}
                >
                  <p>{option}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={"empathy-challenge-score"}>
          <p>
            Score: <b>{score}</b> / {NUMBER_OF_QUESTIONS}
          </p>
        </div>
      </div>
    </MinigameMain>
  );
}

export default EmpathyChallengeGame;

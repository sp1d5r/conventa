import React, { useState, useEffect, useRef } from "react";
import "./empathy-challenge.css";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";
import { getEmpathyMinigameData } from "../../../../cloud-infrastructure/firebase/firebase";

const NUMBER_OF_QUESTIONS = 5;

function EmpathyChallengeGame({ setGameState, difficulty }) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrent] = useState({});
  const [questions, setQuestions] = useState([]);
  const [pause, setPause] = useState(false);

  // new state variable for feedback
  const [feedback, setFeedback] = useState(null);

  // reference for timeout
  const timeoutRef = useRef(null);

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
    getEmpathyMinigameData(NUMBER_OF_QUESTIONS).then((fetchedQuestions) => {
      setQuestions(fetchedQuestions);
      setCurrent(fetchedQuestions[0]);
    });
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
    if (feedback !== null) return; // ignore clicks while showing feedback
    const isCorrect = optionNumber === currentQuestion.correctOption;
    if (isCorrect) {
      increaseScore();
    }
    setFeedback(isCorrect); // show feedback
    timeoutRef.current = setTimeout(() => {
      setFeedback(null);
      updateQuestion();
    }, 1000); // delay
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
    clearTimeout(timeoutRef.current);
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
          totalQuestions={0}
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
          gameOverText={
            "Good Job! Remember to keep in mind what is important to your role."
          }
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
                  className={`empathy-challenge-option ${
                    feedback !== null &&
                    (index === currentQuestion.correctOption
                      ? "correct"
                      : feedback === false
                      ? "incorrect"
                      : "")
                  }`}
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

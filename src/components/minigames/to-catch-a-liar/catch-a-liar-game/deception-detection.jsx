import React, { useState, useEffect, useRef } from "react";
import "../catch-a-liar.css";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameVideo from "../../minigame-components/minigame-video/minigame-video";
import { getDeceptionItems } from "../../../../cloud-infrastructure/firebase/firebase";
import MinigameMain from "../../minigame-components/minigame-main/minigame-main";

/*
 *
 * Documentation
 *
 * Initialisation:
 *   - Get Questions
 *   - Assign Current Questions
 *
 * UseEffect:
 *   - handle pause and end screens
 *
 *
 * */

const loopTimes = (difficulty) => {
  if (difficulty === 1) {
    return 2;
  } else if (difficulty === 2) {
    return 1;
  } else {
    return 0;
  }
};

const QUOTES = [
  "Wow, learning is so fun!",
  "Keep going!",
  "You are doing great!",
  "Unlucky...",
  "We're almost there!",
  "keep going!!",
  "YES!!!",
  "Channel the observer!",
];

const NUMBER_OF_QUESTIONS = 10;

function DeceptionDetection({ setGameState, difficulty }) {
  const questions = useRef({});
  const timeSpent = useRef(0);
  const answerTime = useRef(2); // this is the amount of time the answer propt shows up for
  const [score, setScore] = useState(0);
  const goodAdvice = useRef("Good Luck Pal"); // what the advice prompt is currently showing
  const initialise = true;
  const [currentQuestion, setCurrent] = useState({});
  const [correctPrompt, setCorrectPrompt] = useState("");
  const [answerText, setAnswerText] = useState("");
  const videoLoopValues = loopTimes(difficulty);
  const [pause, setPause] = useState(false);

  /* Question Logic */

  const updateQuestion = () => {
    const [first, ...remaining] = [...questions.current];
    if (first !== undefined) {
      // update questions
      setCorrectPrompt(currentQuestion.correctPrompt);
      questions.current = remaining;
      setCurrent(first);
    } else {
      /* Game Over */
      quitGame();
    }
  };

  const getQuestions = async () => {
    getDeceptionItems(NUMBER_OF_QUESTIONS).then((qs) => {
      const [first, ...remaining] = qs;
      console.log("first element - ", first);
      console.log("remaining element - ", remaining);
      questions.current = remaining;
      setCurrent(first);
    });
  };

  const resetGame = () => {
    getQuestions();
    setPause(false);

    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();

    goodAdvice.current = "Good Luck!";
  };

  /* Handle Scores */
  const increaseScore = () => {
    setScore(score + 1);
  };

  /* Handle Quotes */
  const updateQuote = () => {
    goodAdvice.current = QUOTES[Math.floor(Math.random() * 8)];
  };

  /* Time Updates */
  const increaseTime = () => timeSpent.current++;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        if (timeSpent.current % 5 === 0) {
          updateQuote();
          /*showAnswerScreen();*/
        }
        handleAnswerResult();
        increaseTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  /* Handle Updates */
  useEffect(() => {
    getQuestions();
  }, [initialise]);

  /* ------ RESPONSE ANALYSIS ------- */
  const clickOption = (optionNumber) => {
    hideAnswerScreen();
    if (optionNumber === currentQuestion.correctOption) {
      /* Successful Option Pressed */
      increaseScore();
      setAnswerText("Correct Answer!");
      showAnswerScreen(true);
    } else {
      setAnswerText("Incorrect!");
      showAnswerScreen(false);
    }
    updateQuestion();
  };

  /* ------ ANSWER PROMPT LOGIC ----- */
  const hideAnswerScreen = () => {
    const div = document.getElementById("answer-message");
    div.classList.add("hidden");
    div.removeAttribute("hidden");
    div.setAttribute("hidden", "hidden");
    div.classList.remove("correct-answer");
    div.classList.remove("incorrect-answer");
  };

  const showAnswerScreen = (correct) => {
    const div = document.getElementById("answer-message");
    div.classList.remove("hidden");
    div.removeAttribute("hidden");
    div.classList.add(correct ? "correct-answer" : "incorrect-answer");
    answerTime.current = 2;
  };

  const handleAnswerResult = () => {
    if (answerTime.current === 0) {
      hideAnswerScreen();
    }
    if (answerTime.current > 0) {
      answerTime.current--;
    }
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
    /* Pause any current game */
    setPause(true);
    hidePauseScreen();
    unhideEndScreen();
  };

  /* Unhide/Hide the End Screen */
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
      title={"Deception Detection"}
    >
      <div className={"first-impressions-game-cards"}>
        {
          /* This is the Answer Popup */
          <div id="answer-message" className="answer-message hidden">
            <div className={"answer-card"}>
              <p className={"answer-card-text"}>{answerText}</p>
              <p className={""}>{correctPrompt}</p>
            </div>
          </div>
        }
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
            score={score}
            totalQuestions={NUMBER_OF_QUESTIONS}
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
            timeSpent={"don't worry bout it sweetheart..."}
            score={score}
            totalQuestions={NUMBER_OF_QUESTIONS}
            resetGame={() => {
              resetGame();
            }}
            leaveGame={() => {
              setGameState(0);
            }}
          />
        }
        <div className={"first-impressions-card-main"}>
          <div className={"first-impressions-image"}>
            <MinigameVideo
              src={currentQuestion.videoUrl}
              id="first-impressions-images"
              alt="Girl in a jacket"
              updateQuestions={updateQuestion}
              loopTimes={videoLoopValues}
              pause={pause}
            />
            <div className={"overlay-source"}>
              <p style={{ paddingRight: 20 }}>
                {currentQuestion ? currentQuestion.source : ""}
              </p>
            </div>
          </div>
          <div className={"first-impressions-infobox"}>
            <div className={"infobox-left"}>
              <div className={"inline-objects"}>
                <p>{goodAdvice.current}</p>
              </div>
              <div className={"inline-objects"}></div>
            </div>
            <div className={"infobox-left"}>
              <div className={"inline-objects"}>
                <p>{}</p>
              </div>
              <div className={"inline-objects"}>
                <img
                  alt="Actions"
                  src={require("../../../../assets/first-impressions/Action.png")}
                />
                <p>
                  Score: <b>{score}</b> / {5}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"first-impressions-cards-right"}>
          <div
            className={"first-impressions-card-right"}
            onClick={() => {
              clickOption(true);
            }}
          >
            <p>Truth</p>
          </div>
          <div
            className={"first-impressions-card-right"}
            onClick={() => {
              clickOption(false);
            }}
          >
            <p>Lie</p>
          </div>
        </div>
      </div>
    </MinigameMain>
  );
}

export default DeceptionDetection;

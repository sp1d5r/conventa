import React, { useState, useEffect, useRef } from "react";
import "../catch-a-liar.css";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameVideo from "../../minigame-components/minigame-video/minigame-video";

/*
Task list for this one
- remove the time countdown - DONE
- Make front-end similar to before but instead of four options it should be two - DONE
- Update the template video json functions getQuestions - DONE
- Present a prompt underneath the video
- Add correct answer explanation to the answer prompt
- Add a video playing feature - DONE
- Add a loop limit to the video - DONE
- Make the answer prompt look cleaner
*/

function CatchALiarGame({ setGameState, difficulty }) {
  const timePerQuestion = () => {
    if (difficulty === 1) {
      return 10;
    } else if (difficulty === 2) {
      return 5;
    } else {
      return 3;
    }
  };

  const TIME_PER_QUESTION = timePerQuestion();

  const getQuestions = () => {
    let qs = {
      questions: [
        {
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FLieExample1.mp4?alt=media&token=ce406690-5023-48a0-8dd4-bda9bfaffa33",
          correctOption: false,
          source:
            "Ian and his Ex-Girlfriend Play 2 Truths 1 Lie - Youtube - Smosh Pit",
          correctPrompt:
            "The clients hands where still which indicates she's sad",
        },
        {
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FLieExample2.mp4?alt=media&token=7e35e582-1e56-47d2-b581-51a56204c08f",
          correctOption: true,
          source:
            "Ian and his Ex-Girlfriend Play 2 Truths 1 Lie - Youtube - Smosh Pit",
          correctPrompt:
            "The clients hands where still which indicates she's sad",
        },
        {
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FLieExample1.mp4?alt=media&token=ce406690-5023-48a0-8dd4-bda9bfaffa33",
          correctOption: false,
          source: "Peaky Blinders - BBC - Episode 30",
          correctPrompt:
            "The clients hands where still which indicates she's sad",
        },
        {
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/deception-detection%2FLieExample2.mp4?alt=media&token=7e35e582-1e56-47d2-b581-51a56204c08f",
          correctOption: true,
          source: "Peaky Blinders - BBC - Episode 312",
          correctPrompt:
            "The clients hands where still which indicates she's sad",
        },
      ],
      length: 4,
    };
    return qs;
  };

  const getQuestionsFirst = () => {
    let tempQuestions = [...getQuestions().questions];
    tempQuestions.shift();
    return tempQuestions;
  };

  const quotes = [
    "Wow, learning is so fun!",
    "Keep going!",
    "You are doing great!",
    "Unlucky...",
    "We're almost there!",
    "keep going!!",
    "YES!!!",
    "Channel the observer!",
  ];

  const increaseScore = () => setScore(score + 1);
  const increaseTime = () => timeSpent.current++;
  const updateQoute = () => {
    goodAdvice.current = quotes[Math.floor(Math.random() * 8)];
  };

  /* Tracking Game State */
  const [totalQuestions, setTotalQuestions] = useState(getQuestions().length);
  const questionsRef = useRef(getQuestionsFirst());
  const timeRef = useRef(TIME_PER_QUESTION);
  const paused = useRef(false);
  const quit = useRef(false);
  const currentQuestionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    getQuestions().questions[0]
  );
  const [score, setScore] = useState(0);
  const timeSpent = useRef(0);
  const goodAdvice = useRef("Good Luck!");
  const answerTime = useRef(2);
  const [answerText, setAnswerText] = useState("");
  const [pause, setPause] = useState(false);
  const lastAnswer = useRef(getQuestions().questions[0].correctPrompt);

  /* Unhide/Hide the Pause Screen */
  const hidePauseScreen = () => {
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = "Pause";
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = true;
  };

  const unhidePauseScreen = () => {
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = "Resume";
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = false;
  };

  const pressPause = () => {
    paused.current = !paused.current;
    setPause(!pause);
    if (paused.current) {
      unhidePauseScreen();
    } else {
      hidePauseScreen();
    }
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

  const quitGame = () => {
    /* Pause any current game */
    paused.current = true;
    setPause(true);
    hidePauseScreen();
    unhideEndScreen();
  };

  const saveScoreToUser = () => {
    /* TODO:// Add user functionality here */
    console.log("Saving score to user placeholder");
  };

  const resetGame = () => {
    /*
          Steps to reset game:
            * reset initial array variables
            * make sure the time is reset
            * reset the scores and stuff
            * try again.
        */

    saveScoreToUser();
    let qs = getQuestions().questions;
    setCurrentQuestion(qs[0]);
    qs.shift();
    setTotalQuestions(getQuestions().length);
    questionsRef.current = getQuestionsFirst();
    timeRef.current = TIME_PER_QUESTION;
    paused.current = false;
    setPause(false);
    quit.current = false;
    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();

    currentQuestionIndex.current = 0;
    setScore(0);
    timeSpent.current = 0;
    goodAdvice.current = "Good Luck!";
  };

  const leaveGame = () => {
    setGameState(0);
  };

  const updateQuestions = async () => {
    // Make a local copy of the questions
    // TIME_PER_QUESTION; /* Time Per Question */
    lastAnswer.current = currentQuestion.correctPrompt;
    const [first, ...remainingQuestions] = [...questionsRef.current];
    if (first !== undefined) {
      currentQuestionIndex.current++;
      setCurrentQuestion(first);
      questionsRef.current = remainingQuestions;
      console.log("question", remainingQuestions);
    } else {
      /* Game Over */
      quitGame();
    }
  };

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
    updateQuestions();
    timeRef.current = TIME_PER_QUESTION;
  };

  const hideAnswerScreen = () => {
    const div = document.getElementById("answer-message");
    div.classList.add("hidden");
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        timeRef.current--;

        if (timeRef.current % 5 === 0) {
          updateQoute();
          /*showAnswerScreen();*/
        }
        handleAnswerResult();
        increaseTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const loopTimes = () => {
    if (difficulty === 1) {
      return 2;
    } else if (difficulty === 2) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div className={"first-impressions-game-title"}>
        <p>Minigame - To Catch A Liar</p>
        <div className={"first-impressions-menu"}>
          <button
            id="pause-button-first-impressions"
            className={"pause-button"}
            onClick={() => {
              pressPause();
            }}
          >
            {" "}
            Pause
          </button>
          <button
            onClick={() => {
              updateQuestions();
            }}
            className={"skip-button"}
          >
            Skip{" "}
          </button>
        </div>
      </div>
      <div className={"first-impressions-game-cards"}>
        {
          /* This is the Answer Popup */
          <div id="answer-message" className="answer-message hidden">
            <div className={"answer-card"}>
              <p className={"answer-card-text"}>{answerText}</p>
              <p className={""}>{lastAnswer.current}</p>
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
            timeSpent={timeSpent}
            score={score}
            totalQuestions={totalQuestions}
            pressPause={pressPause}
            quitGame={quitGame}
          />
        }
        {
          /* This is the End Screen */
          <GameOverScreen
            timeSpent={timeSpent}
            score={score}
            totalQuestions={totalQuestions}
            resetGame={resetGame}
            leaveGame={leaveGame}
          />
        }
        <div className={"first-impressions-card-main"}>
          <div className={"first-impressions-image"}>
            <MinigameVideo
              src={currentQuestion.videoUrl}
              id="first-impressions-images"
              alt="Girl in a jacket"
              updateQuestions={updateQuestions}
              loopTimes={loopTimes()}
              pause={pause}
            />
            <div className={"overlay-source"}>
              <p style={{ paddingRight: 20 }}>{currentQuestion.source}</p>
            </div>
          </div>
          <div className={"first-impressions-infobox"}>
            <div className={"infobox-left"}>
              <div className={"inline-objects"}></div>
              <div className={"inline-objects"}>
                <img
                  style={{ height: 20, width: 20 }}
                  alt="Actions"
                  src={require("../../../../assets/first-impressions/TimeSpan.png")}
                />
                <p>
                  Total Time Spent: <b>{timeSpent.current}</b>
                </p>
              </div>
            </div>
            <div className={"infobox-left"}>
              <div className={"inline-objects"}>
                <p>{goodAdvice.current}</p>
              </div>
              <div className={"inline-objects"}>
                <img
                  alt="Actions"
                  src={require("../../../../assets/first-impressions/Action.png")}
                />
                <p>
                  Score: <b>{score}</b> / {totalQuestions}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"first-impressions-cards-right"}>
          <div></div>
          <div className={"catch-a-liar-options"}>
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
      </div>
    </div>
  );
}

export default CatchALiarGame;

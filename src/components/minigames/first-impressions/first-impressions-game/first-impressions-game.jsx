import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";
import LoadingBar from "../../../loading-bar/loading";
import PausedScreen from "../../minigame-components/paused-screen/paused-screen";
import GameOverScreen from "../../minigame-components/game-over-screen/game-over-screen";
import MinigameImage from "../../minigame-components/minigame-image/minigame-image";
/*
TODO for this part of the project:
  - add annimation to the different parts of the screen.
  - Extract out components
*/

function FirstImpressionsGame({ setGameState, difficulty }) {
  const [text, setText] = useState("");
  const timePerQuestion = () => {
    if (difficulty == 1) {
      return 10;
    } else if (difficulty == 2) {
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
          imageUrl: "../../../../assets/first-impressions/peaky-blinders.jpeg",
          option1: "Options 1",
          option2: "Options 2",
          option3: "Options 3",
          option4: "Options 4",
          correctOption: 3,
          correctPrompt: "The clients hands where still which indicates she's sad",
          source: "Peaky Blinders - BBC - Episode 3"
        },
        {
          imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/73C2/production/_122743692_4e7c0805-6e29-4caf-af85-e4e451db69af.png",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 4",
          option4: "Options 1",
          correctOption: 1,
          correctPrompt: "The clients hands where still which indicates she's sad",
          source: "Peaky Blinders - BBC - Episode 12"
        },
        {
          imageUrl: "https://cdn.mos.cms.futurecdn.net/XR4xMcbi2Bv65Fuf2fMAJX.jpeg",
          option1: "Options 4",
          option2: "Options 3",
          option3: "Options 2",
          option4: "Options 1",
          correctOption: 4,
          correctPrompt: "The clients hands where still which indicates she's sad",
          source: "Peaky Blinders - BBC - Episode 30"
        },
        {
          imageUrl: "https://variety.com/wp-content/uploads/2019/09/peaky-blinders-season-5.jpg?w=681&h=383&crop=1",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 1",
          option4: "Options 4",
          correctOption: 2,
          correctPrompt: "The clients hands where still which indicates she's sad",
          source: "Peaky Blinders - BBC - Episode 312"
        }
      ],
      length: 10,
    }
    return qs
  }

  const getQuestionsFirst = () => {
      let tempQuestions = [... getQuestions().questions];
      tempQuestions.shift();
      return tempQuestions;
    }

  const quotes = [
    "Wow, learning is so fun!",
    "Keep going!",
    "You are doing great!",
    "Unlucky...",
    "We're almost there!",
    "keep going!!",
    "YES!!!",
    "Channel the observer!"
  ]

  const increaseScore = () => setScore(score + 1);
  const increaseTime = () =>  timeSpent.current ++;
  const updateQoute = () => {
    goodAdvice.current = quotes[Math.floor(Math.random() * 8)]
  }

  /* Tracking Game State */
  const [questions, setQuestions] = useState(getQuestionsFirst());
  const [totalQuestions, setTotalQuestions] = useState(getQuestions().length);
  const questionsRef = useRef(getQuestionsFirst())
  const timeRef = useRef(TIME_PER_QUESTION);
  const paused = useRef(false);
  const quit = useRef(false);
  const currentQuestionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(getQuestions().questions[0]);
  const lastAnswer = useRef(getQuestions().questions[0].correctPrompt);
  const [score, setScore] = useState(0);
  const timeSpent = useRef(0)
  const goodAdvice = useRef("Good Luck!")
  const answerTime = useRef(2);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerText, setAnswerText] = useState("");

  /* Unhide/Hide the Pause Screen */
  const hidePauseScreen = () => {
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = "Pause";
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = true;
  }

  const unhidePauseScreen = () => {
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = "Resume";
    var pausedMessage = document.getElementById("paused-message");
    pausedMessage.hidden = false;
  }

    /* Unhide/Hide the End Screen */
    const hideEndScreen = () => {
      var endMessage = document.getElementById("end-message");
      endMessage.hidden = true;
    }

    const unhideEndScreen = () => {
      var endMessage = document.getElementById("end-message");
      endMessage.hidden = false;
    }


  const pressPause = () => {
    paused.current = !paused.current;
    if (paused.current){
      unhidePauseScreen();
    } else {
      hidePauseScreen();
    }
  }

  const quitGame = () => {
    /* Pause any current game */
    paused.current = true;
    hidePauseScreen();
    unhideEndScreen();
  }

  const saveScoreToUser = () => {
    /* TODO:// Add user functionality here */
    console.log("Saving score to user placeholder");
  }

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
    setQuestions(qs);
    setTotalQuestions(getQuestions().length);
    questionsRef.current = getQuestionsFirst();
    timeRef.current = TIME_PER_QUESTION;
    paused.current = false;
    quit.current = false;
    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();

    currentQuestionIndex.current = 0;
    setScore(0);
    timeSpent.current = 0;
    goodAdvice.current = "Good Luck!";
  }

  const leaveGame = () => {
    setGameState(0);
  }


  const updateQuestions = async() => {
      // Make a local copy of the questions
      // TIME_PER_QUESTION; /* Time Per Question */
      lastAnswer.current = currentQuestion.correctPrompt;
      const [first, ...remainingQuestions] = [... questionsRef.current]
      if (first !== undefined) {
        currentQuestionIndex.current++;
        setCurrentQuestion(first);
        setQuestions(remainingQuestions)
        questionsRef.current = remainingQuestions;
        console.log('question',remainingQuestions)
      } else {
        /* Game Over */
        quitGame();
      }
  }

  const clickOption = (optionNumber) => {
    hideAnswerScreen()
    if (optionNumber == currentQuestion.correctOption) {
      /* Successful Option Pressed */
      increaseScore();
      setAnswerText("Correct Answer!")
      showAnswerScreen(true)
    } else {
      setAnswerText("Incorrect!")
      showAnswerScreen(false)
    }
    updateQuestions();
    timeRef.current = TIME_PER_QUESTION;
  }

  const hideAnswerScreen = () => {
    const div = document.getElementById("answer-message");
    div.classList.add("hidden")
    div.classList.remove("correct-answer")
    div.classList.remove("incorrect-answer")
  }

  const showAnswerScreen = (correct) => {
    const div = document.getElementById("answer-message");
    div.classList.remove("hidden")
    div.classList.add(correct ? "correct-answer" : "incorrect-answer")
    answerTime.current = 2;
  }


  const handleAnswerResult = () => {
    if (answerTime.current == 0) {
      hideAnswerScreen();
    }
    if (answerTime.current > 0) {
      answerTime.current --;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        if (timeRef.current == 0){
          updateQuestions().then(() => {
            console.log("Time ran out"); /* Update Time Remaining  */
            timeRef.current = TIME_PER_QUESTION;
          });
        } else {
          setText(`Time remaining ${timeRef.current}`);
          timeRef.current--;
        }
        if (timeRef.current % 5 == 0) {
          updateQoute();
          /*showAnswerScreen();*/
        }
        handleAnswerResult();
        increaseTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div className={"first-impressions-game-title"}>
    <p>Minigame - First Impressions</p>
    <div className={"first-impressions-menu"}>
      <button id="pause-button-first-impressions" className={"pause-button"}
      onClick={() => {pressPause()}}> Pause</button>
      <button onClick={() => {updateQuestions()}} className={"skip-button"}>Skip </button>
    </div>
    </div>
    <div className={"first-impressions-game-cards"}>
      { /* This is the Answer Popup */
        <div id="answer-message" className="answer-message hidden">
          <div className={"answer-card"}>
            <p className={"answer-card-text"}>{answerText}</p>
            <p>{lastAnswer.current}</p>
          </div>
        </div>
      }
      { /* This is the Paused Screen */
        <PausedScreen
          gameTitle={"First Impressions"}
          text1={"The goal is to quickly scan the image, read the promt and try to find relevant body language techniques."}
          example={"“Find body language techniques this person is using to portray composure.”"}
          text2={"You will be presented with 10 images and 4 potential techniques. Select the relevant techniques."}
          timeSpent={timeSpent}
          score={score}
          totalQuestions={totalQuestions}
          pressPause={pressPause}
          quitGame={quitGame}
        />
      }
      { /* This is the End Screen */
        <GameOverScreen
          timeSpent={timeSpent}
          score={score}
          totalQuestions={totalQuestions}
          resetGame={resetGame}
          leaveGame={leaveGame}
        />
      }
      <div className={"first-impressions-card-main"}>
        <LoadingBar width={((TIME_PER_QUESTION - timeRef.current) / TIME_PER_QUESTION)*100}/>

        <div className={"first-impressions-image"}>
          <MinigameImage
            src={currentQuestion.imageUrl}
            id="first-impressions-images"
            alt="Girl in a jacket"
          />
          <div className={"image-source"}>
            <p style={{paddingRight: 20}}>{currentQuestion.source}</p>
          </div>
        </div>
        <div className={"first-impressions-infobox"}>
          <div className={"infobox-left"}>
            <div className={"inline-objects"}>
              <img
                alt="Time Remaning"
                src={require("../../../../assets/first-impressions/ComingSoon.png")}
              />
              <p>Time remaining: <b>{timeRef.current}</b></p>
            </div>
            <div className={"inline-objects"}>
              <img
                style={{height: 20, width:20}}
                alt="Actions"
                src={require("../../../../assets/first-impressions/TimeSpan.png")}
              />
              <p>Total Time Spent: <b>{timeSpent.current}</b></p>
            </div>
          </div>
          <div className={"infobox-left"} >
            <div className={"inline-objects"}>
              <p>{goodAdvice.current}</p>
            </div>
            <div className={"inline-objects"}>
              <img
                alt="Actions"
                src={require("../../../../assets/first-impressions/Action.png")}
              />
              <p>Score: <b>{score}</b> / {totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={"first-impressions-cards-right"}>
        <div className={"first-impressions-card-right"} onClick={() => {clickOption(1)}}>
          <p>{currentQuestion.option1}</p>
        </div>
        <div className={"first-impressions-card-right"} onClick={() => {clickOption(2)}}>
          <p>{currentQuestion.option2}</p>
        </div>
        <div className={"first-impressions-card-right"}  onClick={() => {clickOption(3)}}>
          <p>{currentQuestion.option3}</p>
        </div>
        <div className={"first-impressions-card-right"}  onClick={() => {clickOption(4)}}>
          <p>{currentQuestion.option4}</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default FirstImpressionsGame;

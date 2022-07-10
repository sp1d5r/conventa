import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";


/*
TODO for this part of the project:
  - Finish the reset game variable - DONE
  - add functionality to leave the game once it's done
  - add the correct and incorrect popup in the top right of the screen
  - add css styling to the buttons
  - add annimation to the different parts of the screen.
*/

const useImage = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);
  return loaded
}

const MinigameImage = ({ src, alt }) => {
  const { loaded } = useImage({src});
  return (
    <img className={`first-impression-image-act ${loaded}`} src={src} alt={alt}/>
  )
}

function FirstImpressionsGame({  }) {
  const [text, setText] = useState("")

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
          source: "Peaky Blinders - BBC - Episode 3"
        },
        {
          imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/73C2/production/_122743692_4e7c0805-6e29-4caf-af85-e4e451db69af.png",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 4",
          option4: "Options 1",
          correctOption: 1,
          source: "Peaky Blinders - BBC - Episode 12"
        },
        {
          imageUrl: "https://cdn.mos.cms.futurecdn.net/XR4xMcbi2Bv65Fuf2fMAJX.jpeg",
          option1: "Options 4",
          option2: "Options 3",
          option3: "Options 2",
          option4: "Options 1",
          correctOption: 4,
          source: "Peaky Blinders - BBC - Episode 30"
        },
        {
          imageUrl: "https://variety.com/wp-content/uploads/2019/09/peaky-blinders-season-5.jpg?w=681&h=383&crop=1",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 1",
          option4: "Options 4",
          correctOption: 2,
          source: "Peaky Blinders - BBC - Episode 312"
        }
      ],
      length: 10,
    }
    return qs
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
  const [questions, setQuestions] = useState(getQuestions().questions);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const timeRef = useRef(10);
  const paused = useRef(false);
  const quit = useRef(false);
  const currentQuestionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [score, setScore] = useState(0);
  const timeSpent = useRef(0)
  const goodAdvice = useRef("Good Luck!")

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
    setQuestions(getQuestions().questions);
    setTotalQuestions(questions.length);
    timeRef.current = 10;
    paused.current = false;
    quit.current = false;
    /* Hide any additional screens */
    hidePauseScreen();
    hideEndScreen();

    currentQuestionIndex.current = 0;
    setCurrentQuestion(questions[0]);
    setScore(0);
    timeSpent.current = 0;
    goodAdvice.current = "Good Luck!";

  }

  const updateQuestions = () => {
      // Make a local copy of the questions
      let localQuestions = [... questions]
      if (localQuestions.length != 0) {
        currentQuestionIndex.current++;
        let currentQuestionTemp = localQuestions[0];
        setCurrentQuestion(currentQuestionTemp);

        console.log('question',localQuestions.splice(0, 1))
        setQuestions(localQuestions)
      }else {
        /* Game Over */
        quitGame();
      }
  }

  const clickOption = (optionNumber) => {
    if (optionNumber == currentQuestion.correctOption) {
      /* Successful Option Pressed */
      increaseScore();
    } else {
      console.log("failure")
    }
    updateQuestions();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        if (timeRef.current % 5 == 0) {
          updateQoute();
        }
        if (timeRef.current == 0){
          timeRef.current = 21; /* Time Per Question */
          updateQuestions()
          setText("new game")
        } else {
          setText(`Time remaining ${timeRef.current}`);
        }
        timeRef.current--;
        increaseTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      let tempQuestions = [... questions];
      tempQuestions.shift();
      setQuestions(tempQuestions);
   }, [])


  return (
    <div>
    <div className={"first-impressions-game-title"}>
    <p>Minigame - First Impressions</p>
    <div className={"first-impressions-menu"}>
      <button id="pause-button-first-impressions" className={"pause-button"}
      onClick={() => {pressPause()}}> Pause</button>
      <button> skip </button>
    </div>
    </div>
    <div className={"first-impressions-game-cards"}>
      { /* This is the Answer Popup */
        <div id="paused-message" className="error-message" hidden>
        <div className={"first-impressions-card"}>
          <p className={"first-impressions-title"}>First Impressions - Paused!</p>
          <div className={"first-impressions-info"}>
            <p>
              The goal is to quickly scan the image, read the promt and try to find
              relevant body language techniques.
            </p>
            <p>
              For Example:
              <span style={{ fontStyle: "italic" }}>
                “Find body language techniques this person is using to portray
                composure.”
              </span>
            </p>
            <p>
              You will be presented with 10 images and 4 potential techniques.
              Select the relevant techniques.
            </p>
          </div>
          <div className={"first-impressions-info"}>
            <span>
            <img
              style={{height: 20, width:20}}
              alt="Actions"
              src={require("../../../../assets/first-impressions/TimeSpan.png")}
            />
              <p>Total Time Spent: <b>{timeSpent.current}</b></p>
            </span>
            <span>
            <img
              alt="Actions"
              src={require("../../../../assets/first-impressions/Action.png")}
            />
            <p>Score: <b>{score}</b> / {totalQuestions}</p>
            </span>

          </div>

          <div className={"first-impressions-line"} />
          <b>Press the button to begin</b>
          <button className={"pause-button"}
          onClick={() => {pressPause()}}> Resume</button>
          <button className={"quit-button"}
          onClick={() => {quitGame()}}> Quit</button>
        </div>

        </div>
      }
      { /* This is the Paused Screen */
        <div id="paused-message" className="error-message" hidden>
        <div className={"first-impressions-card"}>
          <p className={"first-impressions-title"}>First Impressions - Paused!</p>
          <div className={"first-impressions-info"}>
            <p>
              The goal is to quickly scan the image, read the promt and try to find
              relevant body language techniques.
            </p>
            <p>
              For Example:
              <span style={{ fontStyle: "italic" }}>
                “Find body language techniques this person is using to portray
                composure.”
              </span>
            </p>
            <p>
              You will be presented with 10 images and 4 potential techniques.
              Select the relevant techniques.
            </p>
          </div>
          <div className={"first-impressions-info"}>
            <span>
            <img
              style={{height: 20, width:20}}
              alt="Actions"
              src={require("../../../../assets/first-impressions/TimeSpan.png")}
            />
              <p>Total Time Spent: <b>{timeSpent.current}</b></p>
            </span>
            <span>
            <img
              alt="Actions"
              src={require("../../../../assets/first-impressions/Action.png")}
            />
            <p>Score: <b>{score}</b> / {totalQuestions}</p>
            </span>

          </div>

          <div className={"first-impressions-line"} />
          <b>Press the button to begin</b>
          <button className={"pause-button"}
          onClick={() => {pressPause()}}> Resume</button>
          <button className={"quit-button"}
          onClick={() => {quitGame()}}> Quit</button>
        </div>

        </div>
      }
      { /* This is the End Screen */
        <div id="end-message" className="error-message" hidden>
        <div className={"first-impressions-card"}>
          <p className={"first-impressions-title"}>Game Over!</p>

          <div className={"first-impressions-info"}>
            <span>
            <img
              style={{height: 20, width:20}}
              alt="Actions"
              src={require("../../../../assets/first-impressions/TimeSpan.png")}
            />
              <p>Total Time Spent: <b>{timeSpent.current}</b></p>
            </span>
            <span>
            <img
              alt="Actions"
              src={require("../../../../assets/first-impressions/Action.png")}
            />
            <p>Score: <b>{score}</b> / {totalQuestions}</p>
            </span>

          </div>

          <div className={"first-impressions-line"} />
          <b>Press the button to begin</b>
          <button className={"pause-button"}
          onClick={() => {resetGame()}}> Try Again</button>
          <button className={"pause-button"}
          onClick={() => {pressPause()}}> Leave</button>
        </div>

        </div>
      }
      <div className={"first-impressions-card-main"}>
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

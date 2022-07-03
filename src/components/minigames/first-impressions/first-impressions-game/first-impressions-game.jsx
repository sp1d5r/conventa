import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";


function FirstImpressionsGame({  }) {
  const timeRef = useRef(10);
  const paused = useRef(false);
  const [text, setText] = useState("")

  const getQuestions = () => {
    let qs = {
      questions: [
        {
          imageUrl: "www.jquery-az.com/html/images/banana.jpg",
          option1: "Options 1",
          option2: "Options 2",
          option3: "Options 3",
          option4: "Options 4",
          correctOption: 3
        },
        {
          imageUrl: "www.jquery-az.com/html/images/banana1.jpg",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 4",
          option4: "Options 1",
          correctOption: 1
        },
        {
          imageUrl: "www.jquery-az.com/html/images/banana2.jpg",
          option1: "Options 4",
          option2: "Options 3",
          option3: "Options 2",
          option4: "Options 1",
          correctOption: 4
        },
        {
          imageUrl: "www.jquery-az.com/html/images/banana3.jpg",
          option1: "Options 2",
          option2: "Options 3",
          option3: "Options 1",
          option4: "Options 4",
          correctOption: 2
        }
      ]
    }
    return qs.questions
  }

  const [questions, setQuestions] = useState(getQuestions());
  const currentQuestionIndex = useRef(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  const pressPause = () => {
    paused.current = !paused.current;
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = paused.current ? "Resume" : "Pause";
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
      }
  }

  const clickOption = (optionNumber) => {
    if (optionNumber == currentQuestion.correctOption) {
      /* Successful Option Pressed */
      console.log("success")
    } else {
      console.log("failure")
    }
    updateQuestions();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        if (timeRef.current == 0){
          timeRef.current = 11;
          setText("new game")
        } else {
          setText(`Time remaining ${timeRef.current}`);
        }
        timeRef.current--;
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
      <button id="pause-button-first-impressions" onClick={() => {pressPause()}}> Pause</button>
      <button> skip </button>
    </div>
    </div>
    <div className={"first-impressions-game-cards"}>
      <div className={"first-impressions-card-main"}>
        <div className={"first-impressions-image"}>
          <img
            src="www.jquery-az.com/html/images/banana.jpg"
            id="first-impressions-images"
            alt="Girl in a jacket"
            className={"first-impression-image-act"}
          />

          <div className={"image-source"}>
          <p style={{paddingRight: 20}}>Source</p>
          </div>
        </div>
        <div className={"first-impressions-infobox"}>
          <div className={"infobox-left"}>
            <div className={"inline-objects"}>
              <p>Image</p>
              <p>Time remaining: <b>{timeRef.current}</b></p>
            </div>
            <div className={"inline-objects"}>
              <p>Image</p>
              <p>Time remaining: <b>{timeRef.current}</b></p>
            </div>
          </div>
          <div className={"infobox-left"}>
            <div className={"inline-objects"}>
              <p>Image</p>
              <p>Tasks remaining: <b>{timeRef.current}</b></p>
            </div>
            <div className={"inline-objects"}>
              <p>Image</p>
              <p>Tasks remaining: <b>{timeRef.current}</b></p>
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

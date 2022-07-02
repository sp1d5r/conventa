import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";


function FirstImpressionsGame({  }) {
  const timeRef = useRef(10);
  const paused = useRef(false);
  const [text, setText] = useState("")

  const pressPause = () => {
    paused.current = !paused.current;
    var button = document.getElementById("pause-button-first-impressions");
    button.innerHTML = paused.current ? "Resume" : "Pause";
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
            src="//www.jquery-az.com/html/images/banana.jpg"
            alt="Girl in a jacket"
            className={"first-impression-image-act"}
          >
          </img>
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
        <div className={"first-impressions-card-right"}>
          <p>Option 1</p>
        </div>
        <div className={"first-impressions-card-right"}>
          <p>Option 1</p>
        </div>
        <div className={"first-impressions-card-right"}>
          <p>Option 1</p>
        </div>
        <div className={"first-impressions-card-right"}>
          <p>Option 1</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default FirstImpressionsGame;

import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";


function FirstImpressionsGame({  }) {
  const timeRef = useRef(10);
  const paused = useRef(false);
  const [text, setText] = useState("")


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
      <button onClick={() => {paused.current = !paused.current}}> Pause</button>
      <button> skip </button>
    </div>
    </div>
    <div className={"first-impressions-game-cards"}>
      <div className={"first-impressions-card-main"}>
        <div className={"first-impressions-image"}>

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

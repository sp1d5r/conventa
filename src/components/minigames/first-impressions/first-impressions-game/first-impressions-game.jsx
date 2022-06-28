import React, {useState, useEffect, useRef} from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";


function FirstImpressionsGame({  }) {
  const timeRef = useRef(10);
  const [text, setText] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRef.current == 0){
        timeRef.current = 11;
        setText("new game")
      } else {
        setText(`Time remaining ${timeRef.current}`);
      }
      timeRef.current--;
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
    <div className={"first-impressions-game-title"}>
    <p>Minigame - First Impressions</p>
    <button> pause </button>
    </div>
    <div className={"first-impressions-game-cards"}>
      <div className={"first-impressions-card-main"}>
        <div className={"first-impressions-image"}>

        </div>
        <div className={"first-impressions-infobox"}>
        <p>Time remaining: <b>{timeRef.current}</b></p>
        </div>
      </div>
      <div className={"first-impressions-cards-right"}>
        <div className={"first-impressions-card-right"}>

        </div>
        <div className={"first-impressions-card-right"}>

        </div>
        <div className={"first-impressions-card-right"}>

        </div>
        <div className={"first-impressions-card-right"}>

        </div>
      </div>
    </div>
    </div>
  );
}

export default FirstImpressionsGame;

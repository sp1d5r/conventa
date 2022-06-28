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
    <div className={"first-impressions-card"}>
      <p className={"first-impressions-title"}>Minigame - First Impressions</p>
      <div className={"first-impressions-info"}>
      <p>{text}</p>
      </div>
    </div>
  );
}

export default FirstImpressionsGame;

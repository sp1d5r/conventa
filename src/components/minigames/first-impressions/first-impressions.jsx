import React, { useState } from "react";
import "./first-impressions.css";
import StartFirstImpressions from "./start-first-impressions/start-first-impressions";
import FirstImpressionsGame from "./first-impressions-game/first-impressions-game";

function FirstImpressions() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0)

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return <StartFirstImpressions setState={setState} setDifficulty={setDifficulty}/>;
    } else if (state === 1) {
      /* This is the game state */
      return <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <div className={"first-impressions-main-div"}>{from_minigame_state()}</div>
  );
}

export default FirstImpressions;

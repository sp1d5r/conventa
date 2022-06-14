import React, { useState } from "react";
import "./first-impressions.css";
import StartFirstImpressions from "./start-first-impressions/start-first-impressions";

function FirstImpressions() {
  const [state, setState] = useState(0);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return <StartFirstImpressions setState={setState} />;
    } else if (state === 1) {
      /* This is the game state */
      setState(1);
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <div className={"first-impressions-main-div"}>{from_minigame_state()}</div>
  );
}

export default FirstImpressions;

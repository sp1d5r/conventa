import React, { useState } from "react";
import StartMinigame from "../../minigame-components/start-screen/start-screen";

import MinigameLanding from "../../minigame-components/minigame-landing/minigame-landing";
import NegotiationRoleplayGame from "./negotiation-roleplay-game";

/*
  The minigame
    - similar start screen to the first-impressions screen using start-screen component
    - should loop over a short video
      - easy = 3 times
      - medium = 2 times
      - hard = 1 time
*/

function NegotiationRoleplay() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return (
        <StartMinigame
          setState={setState}
          setDifficulty={setDifficulty}
          minigameId={"negotiation-roleplay"}
          title={"Negotiation Roleplay"}
          text1={
            "In this fun negotiation mini-game, you'll get to step into the shoes of either a buyer or a seller! Once you pick your role, you'll be given a short scenario to set the stage. With a timer ticking away, your challenge is to negotiate skillfully from your chosen perspective."
          }
          example={""}
          text2={
            "To keep things interesting, you'll receive occasional prompts tailored to your role, guiding you to adapt your strategy on the fly. Get ready to hone your negotiation skills and enjoy the thrill of striking a deal!"
          }
        />
      );
    } else if (state === 1) {
      /* This is the game state */
      let time = 60;
      if (difficulty === 1) {
        time = 30;
      } else if (difficulty === 3) {
        time = 15;
      }
      return <NegotiationRoleplayGame setGameState={setState} time={time} />;
      // <CatchALiarGame setGameState={setState} difficulty={difficulty} />;
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <MinigameLanding color={"#FFD2B7"}>{from_minigame_state()}</MinigameLanding>
  );
}

export default NegotiationRoleplay;

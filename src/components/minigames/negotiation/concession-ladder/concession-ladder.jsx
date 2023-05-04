import React, { useState } from "react";
import StartMinigame from "../../minigame-components/start-screen/start-screen";

import MinigameLanding from "../../minigame-components/minigame-landing/minigame-landing";
import ConcessionLadderGame from "./concession-ladder-game";

/*
  The minigame
    - similar start screen to the first-impressions screen using start-screen component
    - should loop over a short video
      - easy = 3 times
      - medium = 2 times
      - hard = 1 time
*/

function ConcessionLadder() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return (
        <StartMinigame
          setState={setState}
          setDifficulty={setDifficulty}
          minigameId={"concession-ladder"}
          title={"Concession Ladder"}
          text1={
            "Introducing the Concession Ladder mini game! This interactive game helps you sharpen your negotiation skills by strategically making concessions to find a balanced agreement. Here's how it works:"
          }
          example={
            "Set the timer: Adjust the slider to decide how long you'd like to practice for.\n" +
            "Get a scenario: You'll receive a negotiation scenario with several points of contention to work through.\n" +
            "Make concessions: Throughout the game, decide when and where to make concessions, prioritizing your interests and identifying areas where you can compromise.\n" +
            "Find balance: Your goal is to strike a balance between both parties' interests and reach a mutually beneficial agreement before the timer runs out."
          }
          text2={
            "By practicing the Concession Ladder, you'll learn how to prioritize, create value for both parties, and effectively navigate the art of negotiation. Are you ready to level up your negotiation skills? Give the Concession Ladder mini game a try!"
          }
        />
      );
    } else if (state === 1) {
      /* This is the game state */
      /* This is the game state */
      let time = 15;
      if (difficulty === 1) {
        time = 10;
      } else if (difficulty === 3) {
        time = 5;
      }
      return <ConcessionLadderGame setGameState={setState} time={time} />;
      // <CatchALiarGame setGameState={setState} difficulty={difficulty} />;
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <MinigameLanding color={"#b7ffcb"}>{from_minigame_state()}</MinigameLanding>
  );
}

export default ConcessionLadder;

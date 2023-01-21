import React, { useState } from "react";
import "./tracking-client-emotions.css";
import StartMinigame from "../minigame-components/start-screen/start-screen";
import TrackingClientEmotionsGame from "./tracking-client-emotions-game/tracking-client-emotions-game";
import MinigameLanding from "../minigame-components/minigame-landing/minigame-landing";

/*
  The minigame
    - similar start screen to the first-impressions screen using start-screen component
    - should loop over a short video
      - easy = 3 times
      - medium = 2 times
      - hard = 1 time
*/

function TrackingClientEmotions() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return (
        <StartMinigame
          setState={setState}
          setDifficulty={setDifficulty}
          minigameId={"tracking-client-emotions"}
          title={"Tracking Client Emotions"}
          text1={
            "You will be presented with a background prompt and then a video will be shown. Your task is to determine how the client is feeling."
          }
          example={"“We will get back to you with an email soon.”"}
          text2={
            "You will be presented with options to choose from, explaining an emotion with a certain body language."
          }
        />
      );
    } else if (state === 1) {
      /* This is the game state */
      return (
        <TrackingClientEmotionsGame
          setGameState={setState}
          difficulty={difficulty}
        />
      );
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <MinigameLanding color={"#E5B7FF"}>{from_minigame_state()}</MinigameLanding>
  );
}

export default TrackingClientEmotions;

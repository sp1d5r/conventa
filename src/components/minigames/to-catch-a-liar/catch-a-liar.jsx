import React, { useEffect, useState } from "react";
import "./catch-a-liar.css";
import StartMinigame from "../minigame-components/start-screen/start-screen";
import { change_color } from "../../../cloud-infrastructure/utils/color";
import DeceptionDetection from "./catch-a-liar-game/deception-detection";

/*
  The minigame
    - similar start screen to the first-impressions screen using start-screen component
    - should loop over a short video
      - easy = 3 times
      - medium = 2 times
      - hard = 1 time
*/

function CatchALiar() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    change_color("#FFB7B7");
  }, []);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */
      return (
        <StartMinigame
          setState={setState}
          setDifficulty={setDifficulty}
          minigameId={"catch-a-liar"}
          title={"To Catch A Liar"}
          text1={
            "You will have a looping video playing, your job is to determine if the person in the video is telling the truth or not."
          }
          example={"I never once *rubs nose* lied in my life."}
          text2={
            "You will be presented with `Truth` and `Lie` pick the correct option for a point"
          }
        />
      );
    } else if (state === 1) {
      /* This is the game state */
      return (
        <DeceptionDetection setGameState={setState} difficulty={difficulty} />
      );
      // <CatchALiarGame setGameState={setState} difficulty={difficulty} />;
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <div className={"white-background"}>
      <div className={"catch-a-liar-main-div"}>{from_minigame_state()}</div>
    </div>
  );
}

export default CatchALiar;

import React, { useState } from "react";
import StartMinigame from "../../minigame-components/start-screen/start-screen";
import MinigameLanding from "../../minigame-components/minigame-landing/minigame-landing";
import EmpathyChallengeGame from "./empathy-challenge-game";

/*
  The minigame
    - similar start screen to the first-impressions screen using start-screen component
    - should loop over a short video
      - easy = 3 times
      - medium = 2 times
      - hard = 1 time
*/

function EmpathyChallenge() {
  const [state, setState] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  const from_minigame_state = () => {
    if (state === 0) {
      /* This is the intro state */

      return (
        <StartMinigame
          setState={setState}
          setDifficulty={setDifficulty}
          minigameId={"empathy-challenge"}
          title={"Empathy Challenge"}
          text1={
            "Introducing the Empathy Challenge! In this engaging mini game, you'll be presented with a series of statements from a negotiation partner. Your task is to quickly select the most empathetic response from a list of options. "
          }
          example={
            "Statement: \"I'm worried that if we agree to this deal, our team won't be able to handle the workload.\"\n" +
            "\n" +
            "Response options:\n" +
            'A. "Well, maybe you should hire more staff."\n' +
            "B. \"I understand your concern. Let's explore ways we can adjust the deal to accommodate your team's capacity.\"\n" +
            'C. "That\'s not our problem."'
          }
          text2={
            "This fun and interactive game will help you practice active listening and responding with empathy during negotiations, sharpening your skills for real-life situations. Get ready to connect with your negotiation partners on a deeper level!"
          }
        />
      );
    } else if (state === 1) {
      /* This is the game state */
      console.log("here");
      return (
        <EmpathyChallengeGame setGameState={setState} difficulty={difficulty} />
      );
      // <CatchALiarGame setGameState={setState} difficulty={difficulty} />;
      // <FirstImpressionsGame setGameState={setState} difficulty={difficulty}/>;
    } else {
      /* This is the game complete state */
    }
  };

  return (
    <MinigameLanding color={"#fdb7ff"}>{from_minigame_state()}</MinigameLanding>
  );
}

export default EmpathyChallenge;

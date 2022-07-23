import React from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";
import StartMinigame from "../../minigame-components/start-screen/start-screen"

function StartFirstImpressions({ setState, setDifficulty }) {
  const get_last_score = () => {
    return "Your last best score has been 250";
  };

  return (
    <StartMinigame
      setState={setState}
      setDifficulty={setDifficulty}
      minigameId={"first-impressions"}
      title={"First Impressions"}
      text1={"The goal is to quickly scan the image, read the promt and try to find relevant body language techniques."}
      example={"Find body language techniques this person is using to portray composure."}
      text2={"You will be presented with 10 images and 4 potential techniques. Select all the relevant techniques."}

    />
  );
}

export default StartFirstImpressions;

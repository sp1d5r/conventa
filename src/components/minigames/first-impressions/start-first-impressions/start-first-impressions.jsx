import React from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";

function StartFirstImpressions({ setState, setDifficulty }) {
  const get_last_score = () => {
    return "Your last best score has been 250";
  };

  return (
    <div className={"first-impressions-card"}>
      <p className={"first-impressions-title"}>Minigame - First Impressions</p>
      <div className={"first-impressions-info"}>
        <p>
          The goal is to quickly scan the image, read the promt and try to find
          relevant body language techniques.
        </p>
        <p>
          For Example:
          <span style={{ fontStyle: "italic" }}>
            “Find body language techniques this person is using to portray
            composure.”
          </span>
        </p>
        <p>
          You will be presented with 10 images and 4 potential techniques.
          Select all the relevant techniques.
        </p>
      </div>
      <p>{get_last_score()}</p>
      <div className={"first-impressions-line"} />
      <b>Let's Begin!</b>
      <div className={"first-impression-button-div"}>
        <MinigameButton
          text={"Easy"}
          color={"green"}
          onClick={() => {setDifficulty(1);setState(1)}}
        />
        <MinigameButton
          text={"Medium"}
          color={"blue"}
          onClick={() => {setDifficulty(2);setState(1)}}
        />
        <MinigameButton
          text={"Hard"}
          color={"red"}
          onClick={() => {setDifficulty(3);setState(1)}}
        />
      </div>
    </div>
  );
}

export default StartFirstImpressions;

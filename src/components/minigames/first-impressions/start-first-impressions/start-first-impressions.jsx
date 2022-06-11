import React from "react";
import "../first-impressions.css";

function StartFirstImpressions() {
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
      <div>
        <button>easy</button>

        <button>medium</button>

        <button>hard</button>
      </div>
    </div>
  );
}

export default StartFirstImpressions;

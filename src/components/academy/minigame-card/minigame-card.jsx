import React from "react";
import "./minigame-card.css";
import { Link } from "react-router-dom";

function MiniGameCard({ imagePath, title, time, difficulty }) {
  const _get_difficulty = () => {
    if (difficulty === 0) {
      return require("../../../assets/Icons/difficulty/easy.svg").default;
    } else if (difficulty === 1) {
      return require("../../../assets/Icons/difficulty/medium.svg").default;
    } else {
      return require("../../../assets/Icons/difficulty/hard.svg").default;
    }
  };

  const _get_difficulty_name = () => {
    if (difficulty === 0) {
      return "easy";
    } else if (difficulty === 1) {
      return "medium";
    } else {
      return "hard";
    }
  };

  return (
    <Link className={"academy-content-minigame"} to={`/minigame/${title}`}>
      <div className={"academy-content-minigame-image"}>
        <img
          className={"academy-content-minigame-image-data"}
          src={imagePath}
          alt={"minigame Notational Data 1"}
        />
      </div>
      <div className={"academy-content-minigame-title"}>
        <p>{title}</p>
      </div>
      <div className={"academy-content-course-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This course is expected to take 30 minutes"}
        />
        <p>{time} minutes</p>
      </div>
      <div className={"academy-content-minigame-info"}>
        <img
          src={_get_difficulty()}
          alt={"This minigame is expected to take 30 minutes"}
        />
        <p>{_get_difficulty_name()}</p>
      </div>
    </Link>
  );
}

export default MiniGameCard;

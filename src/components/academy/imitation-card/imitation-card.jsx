import React from "react";
import { Link } from "react-router-dom";
import auth from "../../../cloud-infrastructure/firebase/firebase";

function ImitationCard({ color, imagePath, title, subtext, difficulty }) {
  const current_user = auth.currentUser;

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
    <Link
      className={"academy-content-minigame"}
      to={current_user ? `/minigame/${title}` : "/auth"}
      style={{
        backgroundColor: color,
        border: "1px solid #000000",
      }}
    >
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
      <div className={"academy-content-course-subtext"}>
        <p>{subtext}</p>
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

export default ImitationCard;

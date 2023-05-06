import React from "react";
import { Link } from "react-router-dom";
import auth from "../../../cloud-infrastructure/firebase/firebase";
import ComingSoon from "../../../assets/home/coming-soon.svg";
import "./assessment.css";

function AssessmentCard({
  color,
  imagePath,
  title,
  locked,
  subtext,
  difficulty,
}) {
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

  const getLinkPath = () => {
    if (current_user) {
      if (locked) {
        /* Create a Better Pricing Page */
        return "/content-locked/";
      } else {
        return `/assessment/${title}`;
      }
    } else {
      return "/auth";
    }
  };

  return (
    <Link
      className={`academy-content-minigame`}
      to={getLinkPath()}
      style={{
        backgroundColor: color,
        border: "3px solid #000000",
      }}
    >
      <img
        className={"work-in-progress-tag"}
        src={ComingSoon}
        alt={"Coming Soon"}
      />
      <div className={"academy-content-minigame-image"}>
        <img
          className={"academy-content-minigame-image-data"}
          src={imagePath}
          alt={"minigame Notational Data 1"}
        />
      </div>
      <div className={"academy-content-assessment-title"}>
        <p>{title}</p>
      </div>
      <div className={"academy-assessment-subtext"}>
        <p>{subtext}</p>
      </div>
      <div className={"academy-content-assessment-info"}>
        {locked ? (
          <b className={"locked-text"}>Locked</b>
        ) : (
          <>
            <img
              src={_get_difficulty()}
              alt={"This minigame is expected to take 30 minutes"}
            />
            <p>{_get_difficulty_name()}</p>
          </>
        )}
      </div>
    </Link>
  );
}

export default AssessmentCard;

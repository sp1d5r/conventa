import React from "react";
import "./minigame-card.css";

function MiniGameCard({ imagePath, title, time }) {
  return (
    <div className={"academy-content-minigame"}>
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
      <div className={"academy-content-minigame-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This minigame is expected to take 30 minutes"}
        />
        <p>{time} minutes</p>
      </div>
      <div className={"academy-content-minigame-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This minigame is expected to take 30 minutes"}
        />
        <p>{time} minutes</p>
      </div>
      <div className={"academy-content-minigame-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This minigame is expected to take 30 minutes"}
        />
        <p>{time} minutes</p>
      </div>
    </div>
  );
}

export default MiniGameCard;

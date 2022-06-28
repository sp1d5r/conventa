import React from "react";
import "../first-impressions.css";
import MinigameButton from "../../../button/minigame-button";

function FirstImpressionsGame({ setState }) {
  return (
    <div className={"first-impressions-card"}>
      <p className={"first-impressions-title"}>Minigame - First Impressions</p>
      <div className={"first-impressions-info"}>
      </div>
    </div>
  );
}

export default FirstImpressionsGame;

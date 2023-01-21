import React from "react";
import "./minigame-main.css";
import "../shared.css";

function MinigameMain({ title, pauseGame, updateQuestion, children }) {
  return (
    <div>
      <div className={"minigame-main-top"}>
        <p className={"minigame-main-title"}>{title}</p>
        <div className={"minigame-main-button"}>
          <button
            className={"pause-button"}
            onClick={() => {
              pauseGame();
            }}
          >
            Pause
          </button>
          <button
            className={"skip-button"}
            onClick={() => {
              updateQuestion();
            }}
          >
            Skip
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default MinigameMain;

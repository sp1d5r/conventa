import React from "react";
import "./minigame-main.css";
import "../shared.css";

function MinigameMain({
  title,
  pauseGame,
  updateQuestion,
  children,
  skipable,
  color,
}) {
  return (
    <div className={"minigame-main"}>
      <div className={"minigame-main-top"} style={{ backgroundColor: color }}>
        <p>{title}</p>
        <div className={"minigame-main-button"}>
          <button
            className={"pause-button"}
            onClick={() => {
              pauseGame();
            }}
          >
            Pause
          </button>
          {skipable ? (
            <button
              className={"skip-button"}
              onClick={() => {
                updateQuestion();
              }}
            >
              Skip
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default MinigameMain;

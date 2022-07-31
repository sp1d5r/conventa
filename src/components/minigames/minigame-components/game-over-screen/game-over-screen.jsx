import React from "react";
import "./game-over-screen.css";
import "../shared.css";

function GameOverScreen({
  timeSpent,
  score,
  totalQuestions,
  resetGame,
  leaveGame,
}) {
  return (
    <div id="end-message" className="error-message" hidden>
      <div className={"game-over-card"}>
        <p className={"game-over-title"}>Game Over!</p>

        <div className={"game-over-info"}>
          <span>
            <img
              style={{ height: 20, width: 20 }}
              alt="Actions"
              src={require("../../../../assets/first-impressions/TimeSpan.png")}
            />
            <p>
              Total Time Spent: <b>{timeSpent.current}</b>
            </p>
          </span>
          <span>
            <img
              alt="Actions"
              src={require("../../../../assets/first-impressions/Action.png")}
            />
            <p>
              Score: <b>{score}</b> / {totalQuestions}
            </p>
          </span>
        </div>

        <div className={"game-over-line"} />
        <b>Press the button to begin</b>
        <button
          className={"skip-button"}
          onClick={() => {
            resetGame();
          }}
        >
          {" "}
          Try Again
        </button>
        <button
          className={"quit-button"}
          onClick={() => {
            leaveGame();
          }}
        >
          {" "}
          Leave
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;

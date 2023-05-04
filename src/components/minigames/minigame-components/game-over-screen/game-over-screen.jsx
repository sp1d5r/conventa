import React from "react";
import "./game-over-screen.css";
import "../shared.css";
import MinigameButton from "../../../button/minigame-button";

function GameOverScreen({
  score,
  totalQuestions,
  resetGame,
  leaveGame,
  gameOverText,
}) {
  return (
    <div id="end-message" className="overlay-main-div" hidden>
      <div className={"overlay-card"}>
        <p className={"minigame-start-title game-over-title"}>Game Over!</p>

        {gameOverText !== "" ? (
          <div className={"score-info"}>
            <span>
              <p>{gameOverText}</p>
            </span>
          </div>
        ) : (
          <></>
        )}

        <div className={"score-info"}>
          {totalQuestions === 0 ? (
            <></>
          ) : (
            <span>
              <img
                alt="Actions"
                src={require("../../../../assets/first-impressions/Action.png")}
              />
              <p>
                Score: <b>{score}</b> / {totalQuestions}
              </p>
            </span>
          )}
        </div>

        <div className={"game-over-line"} />
        <b className={"begin-text"}>Press the button to progress</b>
        <div className={"minigame-start-button-div spaced-button"}>
          <MinigameButton
            text={"Try Again"}
            color={"blue"}
            onClick={() => {
              resetGame();
            }}
          />
          <MinigameButton
            text={"Leave"}
            color={"red"}
            onClick={() => {
              leaveGame();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;

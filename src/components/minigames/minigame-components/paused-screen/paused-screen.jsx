import React from "react";
import "./paused-screen.css";
import "../shared.css";
import MinigameButton from "../../../button/minigame-button";

function PausedScreen({
  gameTitle,
  text1,
  example,
  text2,
  timeSpent,
  score,
  totalQuestions,
  pressPause,
  quitGame,
}) {
  return (
    <div id="paused-message" className="paused-main-div" hidden>
      <div className={"paused-card"}>
        <p className={"minigame-start-title"}>
          {gameTitle} {"\n"} Paused!
        </p>
        <div className={"minigame-start-info"}>
          <p>{text1}</p>
          <p>
            For Example:
            <span style={{ fontStyle: "italic" }}>{example}</span>
          </p>
          <p>{text2}</p>
        </div>
        <div className={"paused-info"}>
          <span className={"card-text"}>
            <img
              alt="Actions"
              src={require("../../../../assets/first-impressions/Action.png")}
            />
            <p>
              Score: <b>{score}</b> / {totalQuestions}
            </p>
          </span>
        </div>

        <div className={"paused-line"} />
        <b className={"begin-text"}>Press the button to begin</b>
        <div className={"minigame-start-button-div"}>
          <MinigameButton
            text={"Resume"}
            color={"blue"}
            onClick={() => {
              pressPause();
            }}
          />
          <MinigameButton
            text={"Quit"}
            color={"red"}
            onClick={() => {
              quitGame();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PausedScreen;

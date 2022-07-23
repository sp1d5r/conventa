import React from 'react';
import "./paused-screen.css";
import "../shared.css";

function PausedScreen({gameTitle, text1, example, text2, timeSpent, score, totalQuestions, pressPause, quitGame}) {

  return (
    <div id="paused-message" className="error-message" hidden>
    <div className={"paused-card"}>
      <p className={"paused-title"}>{gameTitle} - Paused!</p>
      <div className={"paused-info"}>
        <p>
          {text1}
        </p>
        <p>
          For Example:
          <span style={{ fontStyle: "italic" }}>
            {example}
          </span>
        </p>
        <p>
          {text2}
        </p>
      </div>
      <div className={"paused-info"}>
        <span>
        <img
          style={{height: 20, width:20}}
          alt="Actions"
          src={require("../../../../assets/first-impressions/TimeSpan.png")}
        />
          <p>Total Time Spent: <b>{timeSpent.current}</b></p>
        </span>
        <span>
        <img
          alt="Actions"
          src={require("../../../../assets/first-impressions/Action.png")}
        />
        <p>Score: <b>{score}</b> / {totalQuestions}</p>
        </span>

      </div>

      <div className={"paused-line"} />
      <b>Press the button to begin</b>
      <button className={"pause-button"}
        onClick={() => {pressPause()}}> Resume</button>
      <button className={"quit-button"}
        onClick={() => {quitGame()}}> Quit</button>
    </div>
    </div>
  )
}

export default PausedScreen;

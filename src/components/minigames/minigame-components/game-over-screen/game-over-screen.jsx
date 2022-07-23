import React from 'react';

function GameOverScreen({timeSpent, score, totalQuestions, resetGame, leaveGame}) {

  return (
    <div id="end-message" className="error-message" hidden>
    <div className={"first-impressions-card"}>
      <p className={"first-impressions-title"}>Game Over!</p>

      <div className={"first-impressions-info"}>
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

      <div className={"first-impressions-line"} />
      <b>Press the button to begin</b>
      <button className={"skip-button"}
      onClick={() => {resetGame()}}> Try Again</button>
      <button className={"quit-button"}
      onClick={() => {leaveGame()}}> Leave</button>
    </div>
    </div>
  )
}

export default GameOverScreen;

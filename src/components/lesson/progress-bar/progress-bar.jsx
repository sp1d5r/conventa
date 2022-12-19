import React from "react";
import "./progress-bar.css";

function ProgressItem({ items, status, isCurrent }) {
  /*
   * STATUSES
   *  1. "": empty means we haven't seen it yet - should be mute grey
   *  2. "furthest": means this is the one we should be at now <- light blue
   *  3. "text-completed": means this is a text section we've done <- Primary Blue
   *  4. "question-answered-green": means we've answered this question correctly <- green
   *  5. "question-answered-red": means we've answered this question incorrectly <- red
   * */

  /*
   * isCurrent
   *  This is the current content we're on, it will have an outline
   * */

  return (
    <div
      className={`progress-item ${status} ${isCurrent ? "current-item" : ""}`}
      style={{ width: `calc(90% / ${items})` }}
    ></div>
  );
}

function ProgressBar({ goBack, user_progress, currentIndex, goForward }) {
  return (
    <>
      <div className={"progress-div"}>
        <button
          onClick={() => {
            goBack();
          }}
          className={"movement-button"}
        >
          Back
        </button>
        <div className={"progress-bar-div"}>
          {user_progress.map((progress, index) => {
            return (
              <ProgressItem
                items={user_progress.length}
                status={progress}
                isCurrent={index === currentIndex}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            goForward();
          }}
          className={"movement-button"}
        >
          Forward
        </button>
      </div>
    </>
  );
}

export default ProgressBar;

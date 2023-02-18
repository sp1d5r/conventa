import React from "react";
import "./progress-bar.css";

function ProgressBar({ totalPages, currentProgress }) {
  return (
    <div className={"progress-main-div"}>
      <div
        className={"progress-current-div"}
        style={{ width: `${(currentProgress / totalPages) * 100}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;

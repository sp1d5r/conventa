import React from "react";
import "./loading.css";

const LoadingBar = ({ width }) => {
  return (
    <div className={"loading-bar-back"}>
      <div
        className={"loading-bar"}
        style={{
          width: `${width}%`,
        }}
      />
      <div className={"loading-bar-background"} />
    </div>
  );
};

export default LoadingBar;

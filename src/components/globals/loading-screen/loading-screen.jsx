import React from "react";
import "./loading-screen.css";
import LoadingBar from "./loading-bar/loading-bar";

function LoadingScreen({ title, color }) {
  return (
    <div className={"loading-screen"} style={{ backgroundColor: color }}>
      <div>
        <h1 className={"outline-text"}>{title}</h1>
        <p>Loading</p>
        <LoadingBar />
      </div>
    </div>
  );
}

export default LoadingScreen;

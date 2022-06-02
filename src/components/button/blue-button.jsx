import React from "react";
import "./button.css";

function BlueButton({ text }) {
  return (
    <button className={"button-blue"}>
      <p className={"button-blue-text"}>{text}</p>
    </button>
  );
}

export default BlueButton;

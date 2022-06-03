import React from "react";
import "./button.css";

function GreenButton({ text }) {
  return (
    <button className={"button-green"}>
      <p className={"button-green-text"}>{text}</p>
    </button>
  );
}

export default GreenButton;

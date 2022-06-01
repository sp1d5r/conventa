import React from "react";
import "./button.css";

function Button({ text }) {
  return (
    <button className={"button-primary"}>
      <p className={"button-text"}>{text}</p>
    </button>
  );
}

export default Button;

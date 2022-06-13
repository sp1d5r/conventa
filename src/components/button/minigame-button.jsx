import React from "react";
import "./button.css";

function MinigameButton({ text, onClick, color }) {
  return (
    <button className={`button-primary-${color}`} onClick={onClick}>
      <p>{text}</p>
    </button>
  );
}

export default MinigameButton;

import React from "react";
import "./start-screen.css";
import MinigameButton from "../../../button/minigame-button";

function StartMinigame({
  setState,
  setDifficulty,
  minigameId,
  title,
  text1,
  example,
  text2,
  children,
}) {
  const get_last_score = (minigameId) => {
    console.log(minigameId);
    return "";
  };

  return (
    <div className={"minigame-start-card"}>
      <p className={"minigame-start-title"}>Minigame - {title}</p>
      <div className={"minigame-start-info"}>
        {text1 && <p>{text1}</p>}
        {example && (
          <p>
            For Example:
            <span style={{ fontStyle: "italic" }}>{example}</span>
          </p>
        )}
        {text2 && <p>{text2}</p>}
        {children}
      </div>

      <p>{get_last_score()}</p>
      <div className={"minigame-start-line"} />
      <b className={"begin-text"}>Let's Begin!</b>
      <div className={"minigame-start-button-div"}>
        <MinigameButton
          text={"Easy"}
          color={"green"}
          onClick={() => {
            setDifficulty(1);
            setState(1);
          }}
        />
        <MinigameButton
          text={"Medium"}
          color={"blue"}
          onClick={() => {
            setDifficulty(2);
            setState(1);
          }}
        />
        <MinigameButton
          text={"Hard"}
          color={"red"}
          onClick={() => {
            setDifficulty(3);
            setState(1);
          }}
        />
      </div>
    </div>
  );
}

export default StartMinigame;

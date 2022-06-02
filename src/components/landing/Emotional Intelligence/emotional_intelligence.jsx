import React from "react";
import "./emotional_intelligence.css";

function EmotionalIntelligence() {
  return (
    <div className={"emotional-main-div"}>
      <div className={"emotional-title"}>
        <span className={"emotional-title-text"}>
          IMPROVE YOUR{" "}
          <span className={"emotional-title-green"}>
            EMOTIONAL INTELLIGENCE
          </span>
          !
        </span>
        <div className={"emotional-brand-pill"}>
          <p className={""}>BRAND NEW</p>
        </div>
      </div>
      <div className={"emotional-cards"}>
        <div className={"emotional-cols"}>
          <div className={"emotional-text-1"}>
            <p>some text goes here same as always</p>
          </div>
          <div className={"green-box placeholder-1"}></div>
        </div>
        <div className={"emotional-cols"}>
          <div className={"emotional-text-2"}>
            <p>some text goes here same as always</p>
          </div>
        </div>
        <div className={"emotional-cols"}>
          <div className={"green-box placeholder-2"}></div>
          <div className={"emotional-text-3"}>
            <p>some text goes here same as always</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmotionalIntelligence;

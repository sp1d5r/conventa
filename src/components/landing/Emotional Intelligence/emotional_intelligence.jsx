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
          <p className={"emotional-brand-pill-text"}>BRAND NEW</p>
        </div>
      </div>
      <div className={"emotional-cards"}>
        <div className={"emotional-cols"}>
          <div className={"emotional-text-1"}>
            <b>What is Emotional Intelligence?</b>
            <p>
              Emotional intelligence is the ability to be aware and understand
              your own emotions and the emotions of others. It's about being
              able to regulate your emotions, respond effectively to emotions,
              and create positive relationships. Emotional intelligence is a
              important skill to have in both personal and professional
              settings.
            </p>
          </div>
          <div className={"green-box placeholder-1"}></div>
        </div>
        <div className={"emotional-cols"}>
          <div className={"green-box placeholder-2"}></div>
          <div className={"emotional-text-3"}>
            <b>What does that have to do with Body Language?</b>
            <p>
              Body language is a key part of emotional intelligence. By
              understanding and being able to read body language, you can better
              understand the emotions of yourself and others. This can help you
              regulate your emotions, respond effectively to emotions, and
              create positive relationships.
            </p>
          </div>
        </div>
        <div className={"emotional-cols"}>
          <div className={"emotional-text-2"}>
            <b>How can we help?</b>
            <p>
              This website will help build emotional intelligence by providing
              courses and resources on understanding and reading body language.
              By understanding body language, you can better understand the
              emotions of yourself and others. This can help you regulate your
              emotions, respond effectively to emotions, and create positive
              relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmotionalIntelligence;

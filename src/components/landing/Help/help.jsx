import "./help.css";
import React from "react";

function Help() {
  return (
    <div className={"help-div"}>
      <div className={"help-top-div"}>
        <span className={"help-top-text-reverse"}>
          WE ARE HERE TO <span className={"help-top-text"}>HELP</span>!
        </span>
        <p className={"help-top-bottom"}>
          "80% of what you understand in a conversation is read through body
          language - not word choice, tone, or facial expressions" - Tony
          Robbins
        </p>
      </div>
      <div className={"help-bottom-div"}>
        <div className={"help-card"}>
          <div className={"help-card-top"}>
            <img
              className={"help-top-image"}
              src={require("../../../assets/Illustrations/why1.png")}
              alt={"Illusatration part 1"}
            />
          </div>
          <div className={"help-card-bottom"}>
            Our courses help you develop a solid understanding of body language.
          </div>
        </div>
        <div className={"help-card"}>
          <div className={"help-card-top"}>
            <img
              className={"help-top-image"}
              src={require("../../../assets/Illustrations/why2.png")}
              alt={"Illusatration part 2"}
            />
          </div>
          <div className={"help-card-bottom"}>
            Then, our interactive mini games consolidate your knowledge.
          </div>
        </div>
        <div className={"help-card"}>
          <div className={"help-card-top"}>
            <img
              className={"help-top-image"}
              src={require("../../../assets/Illustrations/why3.png")}
              alt={"Illusatration part 3"}
            />
          </div>
          <div className={"help-card-bottom"}>
            We'll send you daily reminders to keep you progressing.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;

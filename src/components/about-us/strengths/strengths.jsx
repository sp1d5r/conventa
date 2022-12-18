import React from "react";
import "./strengths.css";

function Strengths() {
  return (
    <>
      <div className={"strengths-div"}>
        <h1 className={"intro-text-h1"}>Our Strengths</h1>
        <div className={"strength-cards"}>
          <div className={"strength-card"}>
            <h3 className={"strength-heading"}>Software Engineering</h3>
            <p className={"strength-p"}>
              Our goal is to use software to provide an interactive platform for
              users to develop their skills.
            </p>
          </div>

          <div className={"strength-card"}>
            <h3 className={"strength-heading"}>Psychologists</h3>
            <p className={"strength-p"}>
              We use the most up-to-date research as traditional methods to
              inform you in your decision making
            </p>
          </div>

          <div className={"strength-card"}>
            <h3 className={"strength-heading"}>Practitioners</h3>
            <p className={"strength-p"}>
              All of our advice is meant to be applied in your daily lives. We
              do not care about psychology that doesn’t help.
            </p>
          </div>

          <div className={"strength-card"}>
            <h3 className={"strength-heading"}>Designers</h3>
            <p className={"strength-p"}>
              We combine software and design to make the learning experience as
              enjoyable as possible.
            </p>
          </div>
        </div>
      </div>
      <div className={"border-bottom"} />
    </>
  );
}

export default Strengths;

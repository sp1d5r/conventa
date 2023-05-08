import React from "react";
import "./assessment-landing.css";
import { Button } from "react-bootstrap";

function AssessmentLanding({
  color,
  title,
  intro,
  landing,
  setLanding,
  evalFlag,
  main,
  evaluation,
}) {
  const getElement = () => {
    if (evalFlag) {
      return evaluation;
    } else if (landing) {
      return main;
    } else {
      return intro;
    }
  };

  return (
    <div
      className={`assessment-landing-div${landing ? "-selected" : ""}`}
      style={{ backgroundColor: landing ? "" : color }}
    >
      <div
        className={`assessment-landing-header${landing ? "-selected" : ""} `}
      >
        <Button
          className={"assessment-landing-header-button"}
          variant={"danger"}
          onClick={() => {
            window.location.href = "/academy";
          }}
        >
          Exit
        </Button>
        <h1 className={"assessment-landing-header-text"}>{title}</h1>
      </div>
      {getElement()}
    </div>
  );
}

export default AssessmentLanding;

import React, { useState } from "react";
import "./assessment-landing.css";
import { Button } from "react-bootstrap";

function AssessmentLanding({ color, title, intro }) {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`assessment-landing-div${selected ? "-selected" : ""}`}
      style={{ backgroundColor: selected ? "" : color }}
    >
      <div
        className={`assessment-landing-header${selected ? "-selected" : ""} `}
      >
        <Button
          className={"assessment-landing-header-button"}
          variant={"danger"}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          Exit
        </Button>
        <h1 className={"assessment-landing-header-text"}>{title}</h1>
      </div>
      {intro}
    </div>
  );
}

export default AssessmentLanding;

import React, { useEffect } from "react";
import AssessmentLanding from "../shared/assessment-landing";
import { change_color } from "../../../cloud-infrastructure/utils/color";
import "./negotiation-assessment.css";
import LandingImg from "../../../assets/assessments/negotiation.svg";
import { Button } from "react-bootstrap";

const NEGOTIATION_ASSESSMENT_COLOUR = "rgb(248, 184, 184)";

function NegotiationAssessmentLanding() {
  return (
    <div className={"negotiation-assessment-landing-div"}>
      <img
        src={LandingImg}
        alt={"Negotiation Against and AI?"}
        className={"negotiation-landing-img"}
      />
      <div className={"negotiation-instructions"}>
        <p className={"assessment-landing-intro-subheading"}>
          Simulate negotiations and perfect them, before they even happen.
        </p>
        <p className={"assessment-landing-text"}>
          Have an important assessment coming up? Test our the skills you
          learned in an assessment negotiation. Enter in specific information
          around the context of your negotiation. We’ll try to replicate{" "}
        </p>
        <Button>Begin Assessment</Button>
      </div>
    </div>
  );
}

function NegotiationAssessment() {
  useEffect(() => {
    change_color(NEGOTIATION_ASSESSMENT_COLOUR);
  });

  return (
    <AssessmentLanding
      color={NEGOTIATION_ASSESSMENT_COLOUR}
      title={"Negotiation Assessment"}
      intro={<NegotiationAssessmentLanding />}
    />
  );
}

export default NegotiationAssessment;

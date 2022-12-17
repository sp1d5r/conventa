import React from "react";
import "./landing.css";
import Intro from "./intro/intro";
import Competence from "./competence/competence";

function Landing() {
  return (
    <div className={"container"}>
      <Intro />
      <Competence />
    </div>
  );
}

export default Landing;

/*
* <div style={{ width: "100%" }}>
      <Jumbotron />
      <Why />
      <Help />
      <How />
      <EmotionalIntelligence />
      <PricingPlan />`
      <div className={"what-are-you-waiting-for"}>
        <p>What are you waiting for?</p>
        <Link to={"/academy"} className={"jumbo-get-started"}>
          Get Started
        </Link>
      </div>
    </div>
*
* */

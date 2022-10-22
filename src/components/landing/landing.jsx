import React from "react";
import Jumbotron from "./Jumbotron/jumbotron";
import Why from "./Why/why";
import Help from "./Help/help";
import How from "./How/how";
import EmotionalIntelligence from "./Emotional Intelligence/emotional_intelligence";
import PricingPlan from "./Pricing/pricing-plan";
import "./landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ width: "100%" }}>
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
  );
}

export default Landing;

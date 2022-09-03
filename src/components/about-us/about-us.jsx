import React from "react";
import "./about-us.css";
import Landing from "./landing/landing";
import OurBackground from "./landing/our-background";
import OurStrength from "./landing/our-strengths";
import CoreValues from "./landing/core-values";
import TheRoadMap from "./landing/the-roadmap";
import TheTeam from "./landing/the-team";

function AboutUs() {
  return (
    <div>
      <Landing />
      <div style={{ width: "85vw", margin: "auto" }}>
        <OurBackground />
        <OurStrength />
        <CoreValues />
        <TheRoadMap />
        <TheTeam />
      </div>
    </div>
  );
}

export default AboutUs;

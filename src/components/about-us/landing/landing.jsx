import React from "react";
import "../about-us.css";

function Landing() {
  return (
    <div className={"about-us-landing"}>
      <div className={"background-sand"} />
      <div className={"about-us-landing-title"}>
        <div className={"about-us-title-div how-top-part"}>
          <p>About Us</p>
          <p className={"how-span-green-text"}>What's our story?</p>
        </div>
      </div>
      <div className={"about-us-gif"} />
    </div>
  );
}

export default Landing;

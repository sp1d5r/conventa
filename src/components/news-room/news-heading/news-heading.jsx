import React from "react";
import "../news-room.css";

/*
TODO list:
- Make a div with the following annimation
- white dot in the center
- grows vertically
- once it's a line, the line grows horizontally
- when the screen is covered into white,
- it'll slowly lose transparency
- The News Room Appears
- Stocks pricing start moving around the top and the bottom
 */

function NewsHeading() {
  return (
    <div className={"news-room-heading"}>
      <div className="scrolling-text">
        <p>
          Breaking News: Local entrepreneur disrupts market using innovative
          mind-body techniques... Studies show employees practicing mindfulness
          boast 20% productivity boost... Upcoming webinar: Harnessing the power
          of psychology for business success... Tips to enhance negotiation
          skills using body language... Body-Mind Harmony: The secret weapon of
          successful CEOs... Latest research reveals strong correlation between
          mental well-being and business performance... The psychology behind
          successful marketing strategies... Tune in for our exclusive interview
          with renowned psychologist turned entrepreneur... Exploring the role
          of mental resilience in start-up success... Join our live session on
          practical psychology for boosting sales...
        </p>
      </div>
      <div className={"news-room-heading-annimation"}>
        <p className={"news-room-heading-title after-intro-animation"}>
          <span style={{ color: "#e3fffb" }}>T</span>
          <span style={{ color: "#e3fdff" }}>h</span>
          <span style={{ color: "#e3ebff" }}>e</span>
          <span style={{ color: "#fff" }}> </span>
          <span style={{ color: "#e9e3ff" }}>N</span>
          <span style={{ color: "#e9e3ff" }}>e</span>
          <span style={{ color: "#f5e3ff" }}>w</span>
          <span style={{ color: "#f5e3ff" }}>s</span>
          <span style={{ color: "#f5e3ff" }}> </span>
          <span style={{ color: "#ffe3ec" }}>R</span>
          <span style={{ color: "#ffe3e3" }}>o</span>
          <span style={{ color: "#ffede3" }}>o</span>
          <span style={{ color: "#fffce3" }}>m</span>
        </p>
      </div>

      <div className="scrolling-text">
        <p>
          Breaking News: Local entrepreneur disrupts market using innovative
          mind-body techniques... Studies show employees practicing mindfulness
          boast 20% productivity boost... Upcoming webinar: Harnessing the power
          of psychology for business success... Tips to enhance negotiation
          skills using body language... Body-Mind Harmony: The secret weapon of
          successful CEOs... Latest research reveals strong correlation between
          mental well-being and business performance... The psychology behind
          successful marketing strategies... Tune in for our exclusive interview
          with renowned psychologist turned entrepreneur... Exploring the role
          of mental resilience in start-up success... Join our live session on
          practical psychology for boosting sales...
        </p>
      </div>
    </div>
  );
}

export default NewsHeading;

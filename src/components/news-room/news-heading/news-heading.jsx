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
      <div className={"news-room-stock-text"}>
        <div />
      </div>
      <div className={"news-room-heading-annimation"}>
        <p className={"news-room-heading-title after-intro-animation"}>
          <span style={{ color: "#e3fffb" }}>t</span>
          <span style={{ color: "#e3fdff" }}>h</span>
          <span style={{ color: "#e3ebff" }}>e</span>
          <span style={{ color: "#fff" }}> </span>
          <span style={{ color: "#e9e3ff" }}>n</span>
          <span style={{ color: "#e9e3ff" }}>e</span>
          <span style={{ color: "#f5e3ff" }}>w</span>
          <span style={{ color: "#f5e3ff" }}>s</span>
          <span style={{ color: "#f5e3ff" }}> </span>
          <span style={{ color: "#ffe3ec" }}>r</span>
          <span style={{ color: "#ffe3e3" }}>o</span>
          <span style={{ color: "#ffede3" }}>o</span>
          <span style={{ color: "#fffce3" }}>m</span>
        </p>
      </div>

      <div className={"news-room-stock-text"}>
        <div />
      </div>
    </div>
  );
}

export default NewsHeading;

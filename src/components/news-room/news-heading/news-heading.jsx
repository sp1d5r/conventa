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
          THE NEWS ROOM
        </p>
      </div>

      <div className={"news-room-stock-text"}>
        <div />
      </div>
    </div>
  );
}

export default NewsHeading;

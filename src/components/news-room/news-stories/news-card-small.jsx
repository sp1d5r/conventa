import React from "react";
import "../news-room.css";

function NewsCardSmall({ content }) {
  return (
    <div className={"news-card-small"}>
      <div className={"news-card-small-time"}>X Mins</div>
      <h5 className={"news-card-small-title"}>{content.title}</h5>
      <div className={"news-card-small-thumbnail"}></div>
    </div>
  );
}

export default NewsCardSmall;

import React from "react";
import "../news-room.css";

function NewsCardSmall({ content }) {
  return (
    <a className={"news-card-small"} href={content.link}>
      <div className={"news-card-small-time"}>X Mins</div>
      <h5 className={"news-card-small-title"}>{content.title}</h5>
      <img
        className={"news-card-small-thumbnail"}
        src={content.thumbnail}
        alt={`title ${content.title}`}
      ></img>
    </a>
  );
}

export default NewsCardSmall;

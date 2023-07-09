import "./skeleton-card.css";
import React from "react";

function SkeletonCard() {
  return (
    <div
      className={`academy-content-minigame skeleton-template skeleton-loading-color`}
    >
      <div className={"academy-content-minigame-image"}></div>
      <div className={"academy-content-minigame-title"}>
        <div
          className={
            " skeleton-div skeleton-loading-color-div skeleton-loading-color-darker main-text"
          }
        ></div>
      </div>

      <div className={"academy-content-minigame-title"}>
        <div
          className={
            "skeleton-div skeleton-loading-color-div skeleton-loading-color-darker"
          }
        ></div>
      </div>
      <div className={"academy-content-minigame-title"}>
        <div
          className={
            "skeleton-div skeleton-loading-color-div skeleton-loading-color-darker bottom-div"
          }
        ></div>
      </div>
    </div>
  );
}

export default SkeletonCard;

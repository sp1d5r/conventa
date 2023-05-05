/* Final Content */
import React from "react";
import Gems from "../../../../assets/lesson/gem.svg";

function FinalPage({
  lessonTitle,
  lessonCompleteBack,
  lessonCompleteSubmit,
  gems,
}) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"end-splash"} />
        <div className="confetti">
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
          <div className="confetti-piece"></div>
        </div>
        <div className={"lesson-final-main"}>
          <p className={"lesson-text-complete"}>Lesson Complete!</p>
          <img
            src={require("../../../../assets/Icons/FireworkExplosion.png")}
            alt={"Congratulations!!"}
          />
          <p className={"lesson-text-title"}>{lessonTitle}</p>
          <br />
          <b className={"congrats-text"}>Congratulation - You earned</b>
          <div className={"user-gems-final"}>
            <p className={"amount-of-gems-final"}>{gems}</p>
            <img className={"gems-final"} src={Gems} alt={"Gems Earned"} />
          </div>
        </div>
        <div className={"lesson-final-button-div"}>
          <button
            onClick={() => {
              lessonCompleteBack();
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Retry</p>
          </button>
          <button
            onClick={() => {
              lessonCompleteSubmit();
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Submit</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default FinalPage;

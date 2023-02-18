/* Final Content */
import React from "react";

function FinalPage({
  lessonTitle,
  lessonCompleteBack,
  lessonCompleteSubmit,
  lessonCompleteNextLesson,
}) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"lesson-final-main"}>
          <p className={"lesson-text-complete"}>Lesson Complete!</p>
          <img
            src={require("../../../../assets/Icons/FireworkExplosion.png")}
            alt={"Congratulations!!"}
          />
          <p className={"lesson-text-title"}>{lessonTitle}</p>
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
          <button
            onClick={() => {
              lessonCompleteNextLesson();
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Next Lesson</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default FinalPage;

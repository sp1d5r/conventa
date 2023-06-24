/* Case Study Content */
import React from "react";
import "../lesson-content.css";

function CaseStudyPage({ caseStudy, content, submit, feedbackButton }) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"selection-text-top"}>
          <p className={"text-muted-selection"}>
            Read the story and answer the questions
          </p>
          <p className={"case-study"}>Case Study:</p>
          <p className={"selection-question"}>{caseStudy}</p>
        </div>
        <div className={"lesson-content-main"}>
          <p className={"case-study-text"}>{content}</p>
        </div>
        <div className={"lesson-content-button-div"}>
          {feedbackButton}
          <button onClick={submit} className={"lesson-submit-button"}>
            <p className={"lesson-content-submit-text"}>Continue</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default CaseStudyPage;

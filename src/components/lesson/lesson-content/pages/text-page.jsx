/* Text Content */
import React from "react";
import "../lesson-content.css";
import ReactMarkdown from "react-markdown";

function TextPage({ content, viewed, submit, feedbackButton }) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"lesson-content-main"}>
          <ReactMarkdown className={"lesson-text"}>
            {content.replace(/!!!/gi, "\n \n")}
          </ReactMarkdown>
        </div>
        {viewed ? (
          <></>
        ) : (
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button onClick={submit} className={"lesson-submit-button"}>
              <p className={"lesson-content-submit-text"}>Continue</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TextPage;

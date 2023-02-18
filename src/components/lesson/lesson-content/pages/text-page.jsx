/* Text Content */
import React from "react";
import "../lesson-content.css";

function TextPage({ content, viewed, submit }) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"lesson-content-main"}>
          <p className={"lesson-text"}>{content}</p>
        </div>
        {viewed ? (
          <></>
        ) : (
          <div className={"lesson-content-button-div"}>
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

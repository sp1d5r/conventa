import React, { useEffect, useState } from "react";
import "../../lesson-content.css";
import "./feedback-button.css";
import Comments from "../../../../../assets/Icons/Comments.png";
import CloseBlack from "../../../../../assets/Icons/CloseBlack.png";

function FeedbackButton({ pageId, lessonId }) {
  const [pressed, setPressed] = useState(true);
  const [feedbackComment, setFeedbackComment] = useState("");

  useEffect(() => {
    console.log(feedbackComment);
  }, [feedbackComment]);

  if (pressed) {
    return (
      <button
        onClick={() => {
          setPressed(!pressed);
        }}
        className={"lesson-comment-button"}
      >
        <img
          className={"lesson-content-feedback-icon"}
          src={Comments}
          alt={"Comments"}
        ></img>
      </button>
    );
  } else {
    return (
      <div className={"main-div"}>
        <div className={"feedback-div"}>
          <h1>Feedback</h1>
          <p>
            Your feedback helps me improve the app so much. I've added a button
            so now I can diagnose problems appropriately
          </p>

          <textarea
            className={"feedback-textarea"}
            onChange={(e) => {
              setFeedbackComment(e.target.value);
            }}
          ></textarea>
          <div
            className={"feedback-cancel-button"}
            onClick={() => {
              setPressed(!pressed);
            }}
          >
            <img
              className={"lesson-content-feedback-close-icon"}
              src={CloseBlack}
              alt={"Comments"}
            ></img>
          </div>
          <div className={"lesson-content-button-div"}>
            <button onClick={() => {}} className={"lesson-submit-button"}>
              <p className={"lesson-content-submit-text"}>Send Feedback!</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackButton;

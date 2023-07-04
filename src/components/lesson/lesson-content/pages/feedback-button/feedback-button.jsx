import React, { useState } from "react";
import "../../lesson-content.css";
import "./feedback-button.css";
import Comments from "../../../../../assets/Icons/Comments.png";
import CloseBlack from "../../../../../assets/Icons/CloseBlack.png";
import { sendFeedback } from "../../../../../cloud-infrastructure/firebase/firebase";

function FeedbackButton({ pageId, lessonId, courseId }) {
  const [pressed, setPressed] = useState(true);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

          {success ? (
            <div className={"answer-word correct"}>
              <p>Thank you for your feedback!</p>
            </div>
          ) : (
            <></>
          )}

          {error !== "" ? (
            <div className={"answer-word incorrect"}>
              Failed to send... Check your connection?
            </div>
          ) : (
            <></>
          )}

          <textarea
            className={"feedback-textarea"}
            onChange={(e) => {
              setFeedbackComment(e.target.value);
            }}
          ></textarea>
          <div
            className={"feedback-cancel-button"}
            onClick={() => {
              setError("");
              setSuccess(false);
              setFeedbackComment("");
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
            <button
              onClick={() => {
                const res = sendFeedback(
                  pageId,
                  lessonId,
                  courseId,
                  feedbackComment
                );
                res
                  .then((output) => {
                    setSuccess(true);
                    console.log(output);
                  })
                  .catch((err) => {
                    setError(err);
                  });
              }}
              className={"lesson-submit-button"}
            >
              <p className={"lesson-content-submit-text"}>Send Feedback!</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedbackButton;

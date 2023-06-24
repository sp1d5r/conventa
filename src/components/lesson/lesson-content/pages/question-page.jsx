/* Question Content */
import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function QuestionPage({
  question,
  options,
  correctAnswer,
  viewed,
  submit,
  explanation,
  feedbackButton,
}) {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);

  const checkAnswer = () => {
    if (answer !== null) {
      setAnswered(true);
    }
  };

  useEffect(() => {
    setAnswer(null);
  }, [question]);

  const getButton = () => {
    if (!viewed) {
      if (answered) {
        return (
          <>
            <div className={"lesson-content-button-div"}>
              {feedbackButton}
              <button
                onClick={() => {
                  submit(answer === correctAnswer, answer);
                }}
                className={"lesson-submit-button"}
              >
                <p className={"lesson-content-submit-text"}>Continue</p>
              </button>
            </div>
          </>
        );
      } else {
        return (
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button
              onClick={() => checkAnswer()}
              className={"lesson-submit-button"}
            >
              <p className={"lesson-content-submit-text"}>Answer</p>
            </button>
          </div>
        );
      }
    }
  };

  const getChecked = (option) => {
    if (viewed) {
      // check the correct answer
      return option + 1 === correctAnswer;
    }
    return option + 1 === answer;
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <p className={"lesson-text"}>{question}</p>
          {options.map((option, index) => {
            return (
              <label className={"lesson-input"}>
                <input
                  className={"lesson-text"}
                  type="checkbox"
                  id={`option-${index + 1}`}
                  checked={getChecked(index)}
                  onChange={() => {
                    setAnswer(index + 1);
                  }}
                />
                <span className={`lesson-text input-text-lesson`}>
                  {option}
                </span>
              </label>
            );
          })}
          {answered || viewed ? (
            <p className={"lesson-text lesson-text-explanation"}>
              {explanation}
            </p>
          ) : (
            <></>
          )}
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default QuestionPage;

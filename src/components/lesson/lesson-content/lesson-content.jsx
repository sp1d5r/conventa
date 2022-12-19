import React, { useState } from "react";
import "./lesson-content.css";

/* Text Content */
function TextContent({ content, viewed, submit }) {
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

/* Question Content */
function QuestionContent({
  question,
  options,
  correctAnswer,
  viewed,
  submit,
  explanation,
}) {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);

  const checkAnswer = () => {
    if (answer !== null) {
      setAnswered(true);
    }
  };

  const getButton = () => {
    if (!viewed) {
      if (answered) {
        return (
          <>
            <div className={"lesson-content-button-div"}>
              <button
                onClick={() => {
                  submit(answer === correctAnswer);
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

/* Final Content */
function FinalContent({ lessonTitle, submit }) {
  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"lesson-final-main"}>
          <p className={"lesson-text-complete"}>Lesson Complete!</p>
          <img
            src={require("../../../assets/Icons/FireworkExplosion.png")}
            alt={"Congratulations!!"}
          />
          <p className={"lesson-text-title"}>{lessonTitle}</p>
        </div>
        <div className={"lesson-final-button-div"}>
          <button onClick={submit} className={"lesson-submit-button"}>
            <p className={"lesson-content-submit-text"}>Retry</p>
          </button>
          <button onClick={submit} className={"lesson-submit-button"}>
            <p className={"lesson-content-submit-text"}>Submit</p>
          </button>
          <button onClick={submit} className={"lesson-submit-button"}>
            <p className={"lesson-content-submit-text"}>Next Lesson</p>
          </button>
        </div>
      </div>
    </>
  );
}

function LessonContent({ type, content, status, submit }) {
  if (type === "text") {
    return (
      <TextContent
        content={content}
        viewed={status !== "" && status !== "furthest"}
        submit={submit}
      />
    );
  } else if (type === "question") {
    return (
      <QuestionContent
        question={content.question}
        options={content.questions}
        correctAnswer={content.answer}
        viewed={status !== "" && status !== "furthest"}
        submit={submit}
        explanation={content.explanation}
      />
    );
  } else if (type === "final") {
    return <FinalContent lessonTitle={content.title} />;
  }
}

export default LessonContent;

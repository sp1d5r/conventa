/* Question Content */
import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function SelectionItem({
  option,
  index,
  selected,
  correct,
  answered,
  setAnswer,
}) {
  const pressAnswer = () => {
    if (!answered) {
      setAnswer(index + 1);
    }
  };

  const styling = () => {
    const selection_option = "selection-option ease-in ";
    if (answered) {
      const text_selected = selected ? "selected-" : "";
      if (correct) {
        return selection_option + text_selected + "correct";
      } else {
        return selection_option + text_selected + "incorrect";
      }
    } else {
      return selection_option;
    }
  };
  return (
    <div
      className={styling()}
      onClick={() => {
        pressAnswer();
      }}
    >
      <p className={"selection-option-text"}>{option}</p>
    </div>
  );
}

function SelectionTextPage({
  question,
  options,
  correctAnswer,
  submit,
  feedbackButton,
}) {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    setAnswer(null);
  }, [question]);

  const getButton = () => {
    if (answer !== null) {
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
            onClick={() => setAnswer(10)}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Skip</p>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>Select the correct option</p>
            <p className={"selection-question"}>{question}</p>
          </div>

          {options.map((option, index) => {
            return (
              <SelectionItem
                option={option}
                index={index}
                key={index}
                selected={answer === index + 1}
                correct={index + 1 === correctAnswer}
                answered={answer}
                setAnswer={setAnswer}
              />
            );
          })}
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default SelectionTextPage;

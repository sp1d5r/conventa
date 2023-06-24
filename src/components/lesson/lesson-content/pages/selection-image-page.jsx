/* Question Content */
import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function SelectionItem({
  option,
  source,
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
    const selection_option = "selection-image-option ";
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
      <img
        className={"selection-image-image"}
        src={source}
        alt={`Select for ${option}`}
      />
      <p className={"selection-option-text"}>{option}</p>
    </div>
  );
}

function SelectionImagePage({
  question,
  sources,
  options,
  correctAnswer,
  submit,
  feedbackButton,
}) {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    setAnswer(null);
  }, [question, correctAnswer, sources]);

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

          <div className={"selection-image-div"}>
            {options.map((option, index) => {
              return (
                <SelectionItem
                  option={option}
                  source={sources[index]}
                  index={index}
                  selected={answer === index + 1}
                  correct={index + 1 === correctAnswer}
                  answered={answer}
                  setAnswer={setAnswer}
                />
              );
            })}
          </div>
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default SelectionImagePage;

import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function SingleWordPage({ sentence, word, submit, feedbackButton }) {
  const [inputWord, setInputWord] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [sentence, word]);

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button
              onClick={() => {
                submit(
                  inputWord.toLowerCase() === word.toLowerCase(),
                  inputWord
                );
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
            onClick={() => {
              setAnswered(true);
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Submit</p>
          </button>
        </div>
      );
    }
  };

  const getAnswered = () => {
    if (answered) {
      if (inputWord.toLowerCase() === word.toLowerCase()) {
        return (
          <div className={"answer-word correct"}>
            <p className={"page-text"}>Correct Answer</p>
          </div>
        );
      } else {
        return (
          <div className={"incorrect answer-word"}>
            <p className={"page-text"}>Incorrect Answer</p>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"single-word-page question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>Select the correct option</p>
            <p className={"selection-question"}>{sentence}</p>
          </div>

          {answered && inputWord !== word ? (
            <div
              className={"underlined-text-page"}
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              The Correct Answer: {word}
            </div>
          ) : (
            <></>
          )}

          <div className={"single-word-div"}>
            <div className={"single-word-input"}>
              <input
                className={"single-word-input-box page-text"}
                maxLength={word.length}
                onChange={(e) => {
                  if (!answered) {
                    setInputWord(e.target.value);
                  }
                }}
              />
              <div className={"letters-div"}>
                {word.split("").map((elem, index) => {
                  return (
                    <div className={"letter-entry-div"}>
                      <p className={"page-text single-word-actual-char"}>
                        {index < inputWord.length ? inputWord.at(index) : ""}
                      </p>
                      <p className={"single-word-empty-letters page-text"}>_</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {getAnswered()}
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default SingleWordPage;

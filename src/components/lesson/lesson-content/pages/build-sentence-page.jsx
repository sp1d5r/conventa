import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function Word({ word, index, selected, answered, pickWord, removeWord }) {
  const wordStyle = selected ? "selected-word" : "unselected-word";

  const clickWord = () => {
    if (!answered) {
      if (selected) {
        removeWord(index);
      } else {
        pickWord(index);
      }
    }
  };

  return (
    <div
      className={wordStyle}
      onClick={() => {
        clickWord();
      }}
    >
      <p className={"page-text"}>{word}</p>
    </div>
  );
}

function BuildSentencePage({ options, correctAnswer, submit, feedbackButton }) {
  const [wordsPicked, setWordsPicked] = useState([]);
  const [wordsNotPicked, setWordsNotPicked] = useState(options);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setWordsPicked([]);
    setWordsNotPicked(options);
    setAnswered(false);
  }, [options]);

  const pickWord = (index) => {
    if (index < wordsNotPicked.length) {
      const _wordsNotPicked = [...wordsNotPicked];
      const _wordsPicked = [...wordsPicked];
      const element = _wordsNotPicked.splice(index, 1);
      _wordsPicked.push(element);
      setWordsNotPicked(_wordsNotPicked);
      setWordsPicked(_wordsPicked);
    }
  };

  const removeWord = (index) => {
    if (index < wordsPicked.length) {
      const _wordsNotPicked = [...wordsNotPicked];
      const _wordsPicked = [...wordsPicked];
      const element = _wordsPicked.splice(index, 1);
      _wordsNotPicked.push(element);
      setWordsNotPicked(_wordsNotPicked);
      setWordsPicked(_wordsPicked);
    }
  };

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button
              onClick={() => {
                submit(
                  wordsPicked.join(" ") === correctAnswer,
                  wordsPicked.join(" ")
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
      if (wordsPicked.join(" ") === correctAnswer) {
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
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>Complete the sentence</p>
          </div>

          <div className={"words-container"}>
            {wordsPicked.map((option, index) => {
              return (
                <Word
                  word={option}
                  index={index}
                  key={index}
                  selected={true}
                  answered={answered}
                  pickWord={() => {}}
                  removeWord={removeWord}
                />
              );
            })}
          </div>

          {answered && wordsPicked.join(" ") !== correctAnswer ? (
            <div
              className={"underlined-text-page"}
              style={{ marginTop: 15, marginBottom: 15, width: "100%" }}
            >
              {correctAnswer}
            </div>
          ) : (
            <></>
          )}

          {getAnswered()}

          {!answered ? (
            <div className={"words-container"}>
              {wordsNotPicked.map((option, index) => {
                return (
                  <Word
                    word={option}
                    index={index}
                    key={index}
                    selected={false}
                    answered={answered}
                    pickWord={pickWord}
                    removeWord={() => {}}
                  />
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default BuildSentencePage;

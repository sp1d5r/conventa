/* Question Content */
import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function SelectionCard({
  index,
  selected,
  incorrect,
  answered,
  toggleSelect,
  text,
}) {
  const handleCardPress = () => {
    if (!answered) {
      toggleSelect(text);
    }
  };
  return (
    <div
      key={index}
      className={`larger ease-in flip-card ${selected ? "flipped" : ""} ${
        answered ? "answered" : ""
      } ${incorrect ? "incorrect" : ""}`}
      onClick={() => {
        handleCardPress();
      }}
    >
      {text}
    </div>
  );
}

function MatchCards({
  question,
  mapping,
  reverseMapping,
  submit,
  shuffledValues,
  feedbackButton,
}) {
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [answeredValues, setAnsweredValues] = useState([]);
  const [answeredKeys, setAnsweredKeys] = useState([]);
  const [incorrectSet, setIncorrectSet] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState([]);

  useEffect(() => {
    setSelectedKey("");
    setSelectedValue("");
    setAnsweredValues([]);
    setAnsweredKeys([]);
    setIncorrectSet([]);
    setSelectedHistory([]);
  }, [question]);

  const getButton = () => {
    return (
      <>
        <div className={"lesson-content-button-div"}>
          {feedbackButton}
          <button
            onClick={() => {
              submit(incorrectSet.length === 0, selectedHistory);
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Continue</p>
          </button>
        </div>
      </>
    );
  };

  const pushToState = (value, stateSet, setStateSet) => {
    const _stateSet = [...stateSet];
    _stateSet.push(value);
    setStateSet(_stateSet);
  };

  const addIncorrectAnswers = (values) => {
    const _incorrectSet = [...incorrectSet];
    _incorrectSet.push(...values);
    setIncorrectSet(_incorrectSet);
    console.log(incorrectSet);
  };

  const toggleSelectKey = (key) => {
    pushToState(key, selectedHistory, setSelectedHistory);
    if (selectedKey === key) {
      setSelectedKey("");
    } else if (selectedValue !== "") {
      if (mapping[key] === selectedValue) {
        pushToState(key, answeredKeys, setAnsweredKeys);
        pushToState(mapping[key], answeredValues, setAnsweredValues);
        // Reset selected options
        setSelectedKey("");
        setSelectedValue("");
      } else {
        // Incorrect Answer set both sets as wrong
        addIncorrectAnswers([
          key,
          mapping[key],
          selectedValue,
          reverseMapping[selectedValue],
        ]);
        setSelectedKey("");
        setSelectedValue("");
      }
    } else {
      setSelectedKey(key);
    }
  };

  const toggleSelectValue = (value) => {
    pushToState(value, selectedHistory, setSelectedHistory);
    if (selectedValue === value) {
      setSelectedValue("");
    } else if (selectedKey !== "") {
      if (mapping[selectedKey] === value) {
        pushToState(selectedKey, answeredKeys, setAnsweredKeys);
        pushToState(value, answeredValues, setAnsweredValues);
        // Reset selected options
        setSelectedKey("");
        setSelectedValue("");
      } else {
        addIncorrectAnswers([
          value,
          reverseMapping[value],
          selectedKey,
          mapping[selectedKey],
        ]);
        setSelectedKey("");
        setSelectedValue("");
      }
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>
              Click on the cards you think match
            </p>
            <p className={"selection-question"}>{question}</p>
          </div>

          <div className={"selection-image-div"}>
            <div className={"flip-single-selection-"}>
              {Object.keys(mapping).map((key, index) => {
                return (
                  <SelectionCard
                    selected={selectedKey === key}
                    answered={answeredKeys.indexOf(key) !== -1}
                    incorrect={incorrectSet.indexOf(key) !== -1}
                    toggleSelect={toggleSelectKey}
                    index={index}
                    text={key}
                  />
                );
              })}
            </div>
            <div className={"flip-single-selection-"}>
              {shuffledValues.map((value, index) => {
                return (
                  <SelectionCard
                    selected={selectedValue === value}
                    answered={answeredValues.indexOf(value) !== -1}
                    incorrect={incorrectSet.indexOf(value) !== -1}
                    toggleSelect={toggleSelectValue}
                    index={index}
                    text={value}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default MatchCards;

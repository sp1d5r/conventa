/* Question Content */
import React, { useEffect, useState } from "react";
import "../lesson-content.css";

function SelectionCard({ index, selected, answered, toggleSelect, text }) {
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
      }`}
      onClick={() => {
        handleCardPress();
      }}
    >
      {selected || answered ? text : ""}
    </div>
  );
}

function FlipAndSelect({ question, mapping, submit, shuffledValues }) {
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [answeredValues, setAnsweredValues] = useState([]);
  const [answeredKeys, setAnsweredKeys] = useState([]);

  useEffect(() => {
    setSelectedKey("");
    setSelectedValue("");
    setAnsweredKeys([]);
    setAnsweredValues([]);
  }, [question, mapping]);

  const getButton = () => {
    return (
      <>
        <div className={"lesson-content-button-div"}>
          <button
            onClick={() => {
              submit();
            }}
            className={"lesson-submit-button"}
          >
            <p className={"lesson-content-submit-text"}>Continue</p>
          </button>
        </div>
      </>
    );
  };

  const addCorrectAnswer = (value, answeredSet, setAnsweredSet) => {
    const _answeredSet = [...answeredSet];
    _answeredSet.push(value);
    setAnsweredSet(_answeredSet);
  };

  const toggleSelectKey = (key) => {
    if (selectedKey === key) {
      setSelectedKey("");
    } else if (selectedValue !== "") {
      if (mapping[key] === selectedValue) {
        addCorrectAnswer(key, answeredKeys, setAnsweredKeys);
        addCorrectAnswer(mapping[key], answeredValues, setAnsweredValues);
        // Reset selected options
        setSelectedKey("");
        setSelectedValue("");
      } else {
        setSelectedKey(key);
      }
    } else {
      setSelectedKey(key);
    }
  };

  const toggleSelectValue = (value) => {
    if (selectedValue === value) {
      setSelectedValue("");
    } else if (selectedKey !== "") {
      if (mapping[selectedKey] === value) {
        addCorrectAnswer(selectedKey, answeredKeys, setAnsweredKeys);
        addCorrectAnswer(value, answeredValues, setAnsweredValues);
        // Reset selected options
        setSelectedKey("");
        setSelectedValue("");
      } else {
        setSelectedValue(value);
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
              Match Cards - till they are all correct
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
                    toggleSelect={toggleSelectKey}
                    index={index}
                    text={key}
                    key={index}
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
                    toggleSelect={toggleSelectValue}
                    index={index}
                    text={value}
                    key={index}
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

export default FlipAndSelect;

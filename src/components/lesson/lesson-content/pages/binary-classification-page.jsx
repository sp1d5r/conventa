import React, { useEffect, useState } from "react";
import "../lesson-content.css";

const compareArrays = (correct, userChoice) => {
  return correct.every((i) => userChoice.includes(i));
};

function SelectionCard({
  index,
  incorrect,
  answered,
  toggleSelect,
  text,
  category,
}) {
  const handleCardPress = () => {
    if (!answered) {
      toggleSelect(category, index);
    }
  };
  return (
    <div
      key={index}
      className={`larger ease-in flip-card ${answered ? "answered" : ""} ${
        answered && incorrect ? "incorrect" : ""
      }`}
      onClick={() => {
        handleCardPress();
      }}
    >
      {text}
    </div>
  );
}

function BinaryClassificationPage({
  submit,
  categoryOne,
  categoryTwo,
  optionOneResult,
  optionTwoResult,
  allShuffled,
  feedbackButton,
}) {
  const [categoryVals, setCategoryVals] = useState({
    categoryOneVals: [],
    categoryTwoVals: [],
  });
  const [answered, setAnswered] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setAnswered(false);
    setCategoryVals({
      categoryOneVals: [],
      categoryTwoVals: [],
    });
  }, [categoryOne, categoryTwo, optionOneResult, optionTwoResult]);

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button
              onClick={() => {
                submit(
                  compareArrays(
                    optionOneResult,
                    categoryVals.categoryOneVals
                  ) &&
                    compareArrays(
                      optionTwoResult,
                      categoryVals.categoryTwoVals
                    ),
                  JSON.stringify({
                    categoryOne: categoryVals.categoryOneVals,
                    categoryTwo: categoryVals.categoryTwoVals,
                  })
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

  useEffect(() => {
    const _shuffledArray = [...allShuffled];
    const oneShuffled = _shuffledArray.splice(0, _shuffledArray.length / 2);
    const twoShuffled = _shuffledArray;
    setCategoryVals({
      categoryOneVals: oneShuffled,
      categoryTwoVals: twoShuffled,
    });
  }, [allShuffled]);

  const moveCard = (category, index) => {
    let _categoryOneVals = categoryVals.categoryOneVals;
    let _categoryTwoVals = categoryVals.categoryTwoVals;
    if (category === categoryOne) {
      const res = _categoryOneVals.splice(index, 1);
      _categoryTwoVals = _categoryTwoVals.concat(res);
    } else {
      const res = _categoryTwoVals.splice(index, 1);
      _categoryOneVals = _categoryOneVals.concat(res);
    }
    setCategoryVals({
      categoryOneVals: _categoryOneVals,
      categoryTwoVals: _categoryTwoVals,
    });
    setRefresh(!refresh);
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>
              Click on the cards - Put the cards in the correct category.
            </p>
          </div>

          <div className={"selection-image-div"}>
            <div className={"flip-single-selection-"}>
              <p className={"selection-question"}>{categoryOne}</p>
              {categoryVals.categoryOneVals.map((value, index) => {
                return (
                  <SelectionCard
                    answered={answered}
                    incorrect={optionOneResult.indexOf(value) === -1}
                    toggleSelect={moveCard}
                    index={index}
                    key={index}
                    text={value}
                    category={categoryOne}
                  />
                );
              })}
            </div>
            <div className={"flip-single-selection-"}>
              <p className={"selection-question"}>{categoryTwo}</p>
              {categoryVals.categoryTwoVals.map((value, index) => {
                return (
                  <SelectionCard
                    answered={answered}
                    incorrect={optionTwoResult.indexOf(value) === -1}
                    toggleSelect={moveCard}
                    index={index}
                    text={value}
                    key={index}
                    category={categoryTwo}
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

export default BinaryClassificationPage;

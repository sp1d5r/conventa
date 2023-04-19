import React, { useEffect, useState } from "react";
import "../lesson-content.css";

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
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
      className={`larger flip-card ${answered ? "answered" : ""} ${
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
}) {
  const [categoryOneVals, setCategoryOneVals] = useState([]);
  const [categoryTwoVals, setCategoryTwoVals] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            <button
              onClick={() => {
                submit(
                  compareArrays(categoryOneVals, optionOneResult) &&
                    compareArrays(categoryTwoVals, optionTwoResult),
                  JSON.stringify({
                    categoryOne: categoryOneVals,
                    categoryTwo: categoryTwoVals,
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
    setCategoryOneVals(oneShuffled);
    setCategoryTwoVals(twoShuffled);
  }, [allShuffled]);

  const moveCard = (category, index) => {
    let _categoryOneVals = categoryOneVals;
    let _categoryTwoVals = categoryTwoVals;
    if (category === categoryOne) {
      const res = _categoryOneVals.splice(index, 1);

      _categoryTwoVals = _categoryTwoVals.concat(res);
    } else {
      const res = _categoryTwoVals.splice(index, 1);
      _categoryOneVals = _categoryOneVals.concat(res);
    }
    setCategoryOneVals(_categoryOneVals);
    setCategoryTwoVals(_categoryTwoVals);
    setRefresh(!refresh);
  };

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>
              Put the cards in the correct category.
            </p>
          </div>

          <div className={"selection-image-div"}>
            <div className={"flip-single-selection-"}>
              <p className={"selection-question"}>{categoryOne}</p>
              {categoryOneVals.map((value, index) => {
                return (
                  <SelectionCard
                    answered={answered}
                    incorrect={optionOneResult.indexOf(value) === -1}
                    toggleSelect={moveCard}
                    index={index}
                    text={value}
                    category={categoryOne}
                  />
                );
              })}
            </div>
            <div className={"flip-single-selection-"}>
              <p className={"selection-question"}>{categoryTwo}</p>
              {categoryTwoVals.map((value, index) => {
                return (
                  <SelectionCard
                    answered={answered}
                    incorrect={optionTwoResult.indexOf(value) === -1}
                    toggleSelect={moveCard}
                    index={index}
                    text={value}
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

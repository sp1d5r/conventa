import React, { useRef, useState } from "react";
import "../lesson-content.css";

function ReOrderederableList({ list, setList, answered, correctOrder }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [dragging, setDragging] = useState(-1);
  const [targetDrag, setTarget] = useState(-1);

  const dragStart = (e, position) => {
    setTarget(position);
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    setDragging(position);
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    setDragging(-1);
    setTarget(-1);
  };

  const getAnswer = (text, correspondingText) => {
    const isCorrect = text === correspondingText;
    if (answered) {
      if (isCorrect) {
        return "correct";
      } else {
        return "incorrect";
      }
    }
  };

  return (
    <>
      {list &&
        list.map((item, index) => (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            className={`order-list-card flip-card ${
              dragging === index ? "correct" : ""
            } ${targetDrag === index ? "flipped" : ""} ${getAnswer(
              item,
              correctOrder[index]
            )}`}
            onDragEnd={drop}
            key={index}
            draggable
          >
            {item}
          </div>
        ))}
    </>
  );
}

function OrderList({ submit, shuffledList, correctOrder }) {
  const [list, setList] = useState(shuffledList);
  const [answered, setAnswered] = useState(false);

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            <button
              onClick={() => {
                submit(true, "hello");
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
              console.log("Pressed submit");
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

  return (
    <>
      <div className={"lesson-content-div"}>
        <div className={"question-content-main"}>
          <div className={"selection-text-top"}>
            <p className={"text-muted-selection"}>
              Put the cards in the correct order, top to bottom.
            </p>
          </div>
          {answered ? (
            <div className={"selection-text-top"}>
              <p>The Correct order was:</p>
              <p>[{correctOrder.join(", ")}]</p>
            </div>
          ) : (
            <></>
          )}

          <div className={"selection-image-div"}>
            <ReOrderederableList
              list={list}
              setList={setList}
              answered={answered}
              correctOrder={correctOrder}
            />
          </div>
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default OrderList;

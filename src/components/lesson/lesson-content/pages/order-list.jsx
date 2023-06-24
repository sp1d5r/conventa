import "../lesson-content.css";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function moveElement(array, startIndex, endIndex) {
  const element = array.splice(startIndex, 1)[0];
  array.splice(endIndex, 0, element);
  return array;
}

const Card = ({ id, text, index, moveCard, answered, correctText }) => {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    type: "card",
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: "card",
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const getAnswer = (text) => {
    const isCorrect = text === correctText;
    if (answered) {
      if (isCorrect) {
        return "correct";
      } else {
        return "incorrect";
      }
    }
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`order-list-card flip-card  ${getAnswer(text)}`}
    >
      {text}
    </div>
  );
};

export const CardList = ({ cardList, setCardList, answered, correctOrder }) => {
  const moveCard = (dragIndex, hoverIndex) => {
    const newArr = moveElement([...cardList], dragIndex, hoverIndex);
    setCardList(newArr);
  };
  return (
    <div className={"selection-image-div"}>
      {cardList.map((card, index) => (
        <Card
          key={card}
          index={index}
          id={card}
          text={card}
          moveCard={moveCard}
          answered={answered}
          correctText={correctOrder[index]}
        />
      ))}
    </div>
  );
};

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function OrderList({
  submit,
  question,
  shuffledList,
  correctOrder,
  feedbackButton,
}) {
  const [list, setList] = useState(shuffledList);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [shuffledList]);

  const getButton = () => {
    if (answered) {
      return (
        <>
          <div className={"lesson-content-button-div"}>
            {feedbackButton}
            <button
              onClick={() => {
                submit(arraysEqual(list, correctOrder), list);
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
            <div className={"text-top-order-list"}>
              <p className={"subtext-order-list"}>The Correct order was:</p>
              <b>{correctOrder.join(", ")}</b>
            </div>
          ) : (
            <div className={"text-top-order-list"}>
              <b>{question}</b>
            </div>
          )}

          <DndProvider
            backend={MultiBackend}
            options={HTML5toTouch}
            className={"selection-image-div"}
          >
            <CardList
              cardList={list}
              setCardList={setList}
              answered={answered}
              correctOrder={correctOrder}
            />
          </DndProvider>
        </div>
        {getButton()}
      </div>
    </>
  );
}

export default OrderList;

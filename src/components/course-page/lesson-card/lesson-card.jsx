import React from "react";
import { Link } from "react-router-dom";

function LessonCard({ lesson_id }) {
  const get_lesson_information = () => {
    console.log({ lesson_id });
    return {
      lesson_name: "Lesson 1",
      lesson_image: require("../../../assets/Illustrations/lesson.png"),
      lesson_time: 10,
      difficulty: 3,
    };
  };

  const lesson_information = get_lesson_information();

  const _get_difficulty = () => {
    if (lesson_information.difficulty === 0) {
      return require("../../../assets/Icons/difficulty/easy.png");
    } else if (lesson_information.difficulty === 1) {
      return require("../../../assets/Icons/difficulty/medium.png");
    } else {
      return require("../../../assets/Icons/difficulty/hard.png");
    }
  };

  const _get_difficulty_name = () => {
    if (lesson_information.difficulty === 0) {
      return "easy";
    } else if (lesson_information.difficulty === 1) {
      return "medium";
    } else {
      return "hard";
    }
  };

  return (
    <Link
      className={"academy-content-minigame"}
      to={`/lesson/?lesson_id=${lesson_id}`}
    >
      <div className={"academy-content-minigame-image"}>
        <img
          className={"academy-content-minigame-image-data"}
          src={lesson_information.lesson_image}
          alt={"minigame Notational Data 1"}
        />
      </div>
      <div className={"academy-content-minigame-title"}>
        <p>{lesson_information.lesson_name}</p>
      </div>
      <div className={"academy-content-course-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This course is expected to take 30 minutes"}
        />
        <p>{lesson_information.lesson_time} minutes</p>
      </div>
      <div className={"academy-content-minigame-info"}>
        <img
          src={_get_difficulty()}
          alt={"This minigame is expected to take 30 minutes"}
        />
        <p>{_get_difficulty_name()}</p>
      </div>
    </Link>
  );
}

export default LessonCard;

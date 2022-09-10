import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLesson } from "../../../cloud-infrastructure/firebase/firebase";

function LessonCard({ lesson_id, course_id }) {
  const [lesson, setLesson] = useState({});

  const get_lesson_information = (id) => {
    getLesson(lesson_id).then((item) => {
      console.log(item);
      setLesson(item);
    });
  };

  const _get_difficulty = () => {
    if (lesson.difficulty === 0) {
      return require("../../../assets/Icons/difficulty/easy.png");
    } else if (lesson.difficulty === 1) {
      return require("../../../assets/Icons/difficulty/medium.png");
    } else {
      return require("../../../assets/Icons/difficulty/hard.png");
    }
  };

  const _get_difficulty_name = () => {
    if (lesson.difficulty === 0) {
      return "easy";
    } else if (lesson.difficulty === 1) {
      return "medium";
    } else {
      return "hard";
    }
  };

  useEffect(() => {
    get_lesson_information(lesson_id);
  });

  return (
    <Link
      className={"academy-content-minigame"}
      to={`/lesson/?lesson_id=${lesson_id}&course_id=${course_id}`}
    >
      <div className={"academy-content-minigame-image"}>
        <img
          className={"academy-content-minigame-image-data"}
          src={require("../../../assets/Illustrations/lesson.png")}
          alt={"minigame Notational Data 1"}
        />
      </div>
      <div className={"academy-content-minigame-title"}>
        <p>{lesson.title}</p>
      </div>
      <div className={"academy-content-course-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This course is expected to take 30 minutes"}
        />
        <p>{lesson.time} minutes</p>
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

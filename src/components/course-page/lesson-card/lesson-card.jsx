import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getLesson,
  hasUserCompletedLesson,
} from "../../../cloud-infrastructure/firebase/firebase";
import Complete from "../../../assets/home/complete.svg";

function LessonCard({ lesson_ref, course_id, isLocked }) {
  const [lesson, setLesson] = useState({});
  const [completedLesson, setCompletedLesson] = useState(false);

  const get_lesson_information = useCallback(() => {
    getLesson(lesson_ref).then((item) => {
      hasUserCompletedLesson(item.id)
        .then((hasCompleted) => {
          setCompletedLesson(hasCompleted);
        })
        .catch((err) => {
          console.log("failed getting user information.", err);
          setCompletedLesson(false);
        });
      setLesson(item);
    });
  }, [lesson_ref]);

  const _get_difficulty = () => {
    if (lesson.difficulty === "1") {
      return require("../../../assets/Icons/difficulty/easy.svg").default;
    } else if (lesson.difficulty === "2") {
      return require("../../../assets/Icons/difficulty/medium.svg").default;
    } else {
      return require("../../../assets/Icons/difficulty/hard.svg").default;
    }
  };

  const _get_difficulty_name = () => {
    if (lesson.difficulty === "1") {
      return "easy";
    } else if (lesson.difficulty === "2") {
      return "medium";
    } else {
      return "hard";
    }
  };

  useEffect(() => {
    get_lesson_information();
  }, [get_lesson_information]);

  return (
    <Link
      className={`academy-content-minigame ${
        completedLesson ? "lesson-completed" : ""
      }`}
      to={
        isLocked
          ? `/content-locked?reason=lives`
          : `/lesson/?lesson_id=${lesson.id}&course_id=${course_id}`
      }
      id={
        lesson_ref._key.path.segments[lesson_ref._key.path.segments.length - 1]
      }
    >
      {completedLesson ? (
        <img
          className={"work-in-progress-tag"}
          src={Complete}
          alt={"work in progress"}
        />
      ) : (
        <></>
      )}
      <div className={"academy-content-minigame-image"}>
        <img
          className={"academy-content-minigame-image-data"}
          src={lesson.thumbnail}
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
        {completedLesson ? (
          <b>Lesson Completed!</b>
        ) : (
          <>
            <img
              src={_get_difficulty()}
              alt={"This minigame is expected to take 30 minutes"}
            />
            <p>{_get_difficulty_name()}</p>
          </>
        )}
      </div>
    </Link>
  );
}

export default LessonCard;

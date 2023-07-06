import React from "react";
import "./course-card.css";
import { Link } from "react-router-dom";
import { logCourseClicked } from "../../../cloud-infrastructure/firebase/firebase";
import Enrolled from "../../../assets/home/complete-course.svg";

function CourseCard({
  imagePath,
  title,
  time,
  id,
  locked,
  courseProgress,
  color,
}) {
  const logCourseInteraction = () => {
    logCourseClicked(id, title);
  };

  const getLinkPath = () => {
    if (locked) {
      /* Create a Better Pricing Page */
      return "/content-locked?reason=lives";
    } else {
      return `/course/?course_id=${id}`;
    }
  };

  return (
    <Link
      className={`academy-content-minigame ${locked ? "locked" : ""}`}
      to={getLinkPath()}
      onClick={() => {
        logCourseInteraction();
      }}
    >
      {courseProgress !== 0 ? (
        <img
          className={"work-in-progress-tag"}
          src={Enrolled}
          alt={"Enrolled"}
        />
      ) : (
        <></>
      )}

      <div className={"academy-content-course-image"}>
        <img
          className={"academy-content-minigame-image-data offline-caching-img"}
          src={imagePath}
          alt={"Course Notational Data 1"}
        />
      </div>
      <div className={"academy-content-course-title"}>
        <p>{title}</p>
      </div>
      <div className={"academy-content-course-info"}>
        {locked ? (
          <b className={"locked-text"}>Locked</b>
        ) : (
          <>
            <img
              src={require("../../../assets/Icons/time.png")}
              alt={"This course is expected to take 30 minutes"}
            />
            <p>{time} minutes</p>
          </>
        )}
      </div>
      {courseProgress !== 0 ? (
        <div className={"course-progress-bar-container"}>
          <div
            style={{
              backgroundColor: color,
              width: `${courseProgress}%`,
              height: "100%",
              borderRadius: 10,
              boxShadow: "0 0 0 1px #000",
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default CourseCard;

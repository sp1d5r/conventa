import React from "react";
import "./course-card.css";
import { Link } from "react-router-dom";
import auth, {
  logCourseClicked,
} from "../../../cloud-infrastructure/firebase/firebase";

function CourseCard({ imagePath, title, time, id }) {
  const current_user = auth.currentUser;
  const logCourseInteraction = () => {
    logCourseClicked(id, title);
  };

  return (
    <Link
      className={"academy-content-course"}
      to={current_user ? `/course/?course_id=${id}` : "/auth"}
      onClick={() => {
        logCourseInteraction();
      }}
    >
      <div className={"academy-content-course-image"}>
        <img
          className={"academy-content-course-image-data"}
          src={imagePath}
          alt={"Course Notational Data 1"}
        />
      </div>
      <div className={"academy-content-course-title"}>
        <p>{title}</p>
      </div>
      <div className={"academy-content-course-info"}>
        <img
          src={require("../../../assets/Icons/time.png")}
          alt={"This course is expected to take 30 minutes"}
        />
        <p>{time} minutes</p>
      </div>
    </Link>
  );
}

export default CourseCard;

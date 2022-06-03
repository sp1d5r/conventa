import React from "react";
import "./course-card.css";

function CourseCard({ imagePath, title, time }) {
  return (
    <div className={"academy-content-course"}>
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
    </div>
  );
}

export default CourseCard;

import React, { useState } from "react";
import "./course-card.css";
import { Link } from "react-router-dom";
import { logCourseClicked } from "../../../cloud-infrastructure/firebase/firebase";
import Enrolled from "../../../assets/home/complete-course.svg";

function CourseCard({
  imagePath,
  title,
  description,
  time,
  id,
  locked,
  courseProgress,
  color,
}) {
  const [isMouseInside, setMouseInside] = useState(false);

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

  const mouseEntered = () => {
    setMouseInside(true);
  };

  const mouseLeft = () => {
    setMouseInside(false);
  };

  return (
    <Link
      className={`academy-content-minigame ${locked ? "locked" : ""}`}
      to={getLinkPath()}
      onClick={() => {
        logCourseInteraction();
      }}
      onMouseEnter={mouseEntered}
      onMouseLeave={mouseLeft}
      style={{
        flexDirection: "row",
        zIndex: isMouseInside ? 10 : 0,
        height: 350,
        width: isMouseInside ? 450 : "auto",
        backgroundColor: isMouseInside ? color : "",
        transition: "all 0.3s ease-in-out", // Added transition for smoother effect
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "white",
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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

        <div
          className={"academy-content-course-image"}
          style={{
            borderRight: isMouseInside ? "1px solid black" : "",
            backgroundColor: isMouseInside ? "white" : "",
            borderRadius: isMouseInside ? 20 : 0,
          }}
        >
          <img
            className={
              "academy-content-minigame-image-data offline-caching-img"
            }
            src={imagePath}
            alt={"Course Notational Data 1"}
          />
        </div>

        {!isMouseInside && (
          <div className={"academy-content-course-title"}>
            <p>{title}</p>
          </div>
        )}

        {!isMouseInside && (
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
        )}

        {!isMouseInside && courseProgress !== 0 ? (
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
      </div>

      {isMouseInside && (
        <div
          style={{
            flex: 3,
            height: "100%",
            padding: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "space-evenly",
          }}
        >
          <div
            className={"academy-content-course-title"}
            style={{ padding: 0, margin: 0, marginBottom: "1rem" }}
          >
            <p>{title}</p>
          </div>

          <div className={"academy-content-course-description"}>
            <p className={"academy-content-course-description"}>
              {description.substring(0, 200)}{" "}
              {description.length <= 200 ? "" : "..."}
            </p>
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

          <div className={"academy-content-course-info-hover"}>
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
        </div>
      )}
    </Link>
  );
}

export default CourseCard;

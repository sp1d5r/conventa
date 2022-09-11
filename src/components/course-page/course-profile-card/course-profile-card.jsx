import React from "react";
import "./course-profile-card.css";
import GreenButton from "../../button/green-button";
import Button from "../../button/button";

function CourseProfileCard({
  course_name,
  course_difficulty,
  course_duration,
  course_img,
}) {
  const get_course_information = () => {
    /* If logged out - Sign In Button - 1 */
    /* If logged in & not joined course - Join Course - 2*/
    /* If logged in & Joined course - Progress Bar - 3*/
    return 2;
  };

  const login_status = get_course_information();
  const progress = () => {
    /* Get Progress */
    return 70;
  };

  const _get_difficulty = () => {
    if (course_difficulty === 0) {
      return require("../../../assets/Icons/difficulty/easy.png");
    } else if (course_difficulty === 1) {
      return require("../../../assets/Icons/difficulty/medium.png");
    } else {
      return require("../../../assets/Icons/difficulty/hard.png");
    }
  };

  const _get_difficulty_name = () => {
    if (course_difficulty === 0) {
      return "easy";
    } else if (course_difficulty === 1) {
      return "medium";
    } else {
      return "hard";
    }
  };

  return (
    <div className={"course-card-profile-with-progress"}>
      <div className={"course-card-profile-image"}>
        <img src={course_img} alt={"Course phot"} />
      </div>
      <div className={"course-card-profile-title"}>
        <p>{course_name}</p>
      </div>
      <div className={"course-card-profile-additional-info"}>
        <div className={"academy-content-course-info"}>
          <img
            src={require("../../../assets/Icons/time.png")}
            alt={`This course is expected to take ${course_duration} minutes`}
          />
          <p>{course_duration} minutes</p>
        </div>
        <div className={"academy-content-minigame-info"}>
          <img
            src={_get_difficulty()}
            alt={"This minigame is expected to take 30 minutes"}
          />
          <p>{_get_difficulty_name()}</p>
        </div>
      </div>
      <div className={"course-card-profile-call-to-action"}>
        {login_status === 1 && (
          <Button text={"Sign Up"} className={"course-card-button"} />
        )}
        {login_status === 2 && (
          <GreenButton text={"Join Course"} className={"course-card-button"} />
        )}
        {login_status === 3 && (
          <div
            style={{
              width: "100%",
              height: 20,
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: 15,
            }}
          >
            <div
              style={{
                width: `${progress()}%`,
                height: 20,
                backgroundColor: "#E4FFB7",
                borderRadius: 15,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseProfileCard;

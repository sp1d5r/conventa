import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";

import LessonCard from "./lesson-card/lesson-card";
import CourseProfileCard from "./course-profile-card/course-profile-card";
import { getCourse } from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import { Breadcrumb } from "react-bootstrap";

function CourseLanding() {
  /* The URL looks like : http://localhost:3000/course/?course_id=gvhvgvhv
  and the course id you get is gvhvgvhv
  */
  const search_params = useSearchParams()[0];
  const course_id = search_params.get("course_id");
  const [course_information, set_course_information] = useState({});
  const [loading, setLoad] = useState(true);

  const get_course_information = (course_id) => {
    getCourse(course_id).then((info) => {
      set_course_information(info);
      setLoad(false);
    });
  };

  useEffect(() => {
    get_course_information(course_id);
  }, [course_id]);

  const _get_difficulty = () => {
    if (course_information.difficulty === 0) {
      return require("../../assets/Icons/difficulty/easy.png");
    } else if (course_information.difficulty === 1) {
      return require("../../assets/Icons/difficulty/medium.png");
    } else {
      return require("../../assets/Icons/difficulty/hard.png");
    }
  };

  const _get_difficulty_name = () => {
    if (course_information.difficulty === 0) {
      return "  Easy";
    } else if (course_information.difficulty === 1) {
      return "  Medium";
    } else {
      return "  Hard";
    }
  };

  return (
    <div className={"course-landing-main"}>
      <div className={"course-breadcrumbs"}>
        <Breadcrumb className={"lesson-breadcrumb-bar"}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/academy/">Academy</Breadcrumb.Item>
          <Breadcrumb.Item active href={`/course/?course_id=`}>
            {course_information.courseName}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={"course-landing-information"}>
        <div className={"course-landing-title"}>
          {course_information.courseName}
        </div>
        <div className={"course-landing-time"}>
          <img
            className={"course-icon-size"}
            src={require("../../assets/Icons/time.png")}
            alt={`This course is expected to take 20 minutes`}
          />
          <p>20 Mins</p>
        </div>
        <div className={"course-landing-difficulty"}>
          <img
            className={"course-icon-size"}
            src={_get_difficulty()}
            alt={"This minigame is expected to take 30 minutes"}
          />
          <p>{_get_difficulty_name()}</p>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={"course-content-lessons"}>
          <div className={"course-landing-content-section"}>
            <p className={"course-landing-content-title"}>lessons</p>

            <div className={"course-landing-content-section-child"}>
              {course_information &&
                course_information.lessons?.map((lesson_ref, index) => {
                  return (
                    <LessonCard
                      lesson_ref={lesson_ref}
                      course_id={course_id}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>

          {window.innerWidth >= 450 && false ? (
            <div className={"course-content-card-right"}>
              <CourseProfileCard
                course_name={course_information.courseName}
                course_difficulty={course_information.difficulty}
                course_duration={course_information.time}
                course_img={course_information.thumbnail}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseLanding;

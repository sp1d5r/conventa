import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";

import LessonCard from "./lesson-card/lesson-card";
import CourseProfileCard from "./course-profile-card/course-profile-card";
import { getCourse } from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import { Breadcrumb } from "react-bootstrap";
import { change_color } from "../../cloud-infrastructure/utils/color";

function CourseLanding() {
  /* The URL looks like : http://localhost:3000/course/?course_id=gvhvgvhv
  and the course id you get is gvhvgvhv
  Difficulty Ratings:
   0 = Easy
   1 = Medium
   2 = Hard
  */
  const search_params = useSearchParams()[0];
  const course_id = search_params.get("course_id");
  const [course_information, set_course_information] = useState({
    courseName: "Loading...",
    time: "time",
  });
  const [loading, setLoad] = useState(true);

  const get_course_information = (course_id) => {
    getCourse(course_id).then((info) => {
      set_course_information(info);
      setLoad(false);
      change_color(info.color);
    });
  };

  useEffect(() => {
    get_course_information(course_id);
  }, [course_id]);

  const _get_difficulty = () => {
    if (course_information.difficulty === 0) {
      return require("../../assets/Icons/difficulty/easy.svg").default;
    } else if (course_information.difficulty === 1) {
      return require("../../assets/Icons/difficulty/medium.svg").default;
    } else {
      return require("../../assets/Icons/difficulty/hard.svg").default;
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 250) {
        const navbar = document.getElementById("navbar");
        navbar.style.borderBottom = "3px solid black";
      } else {
        const navbar = document.getElementById("navbar");
        navbar.style.borderBottom = "";
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.style.borderBottom = "";
      }
    };
  }, []);

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
          <p>{course_information.time} (mins)</p>
        </div>
        <div className={"course-landing-difficulty"}>
          <img
            className={"course-icon-size"}
            src={_get_difficulty()}
            alt={"This minigame is expected to take 30 minutes"}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={"course-content-lessons"}>
          <div className={"course-landing-content-section"}>
            <p className={"course-landing-content-title"}>lessons</p>

            <div className={"academy-content-section-child-minigame"}>
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

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";
import { Helmet } from "react-helmet";

import LessonCard from "./lesson-card/lesson-card";
import CourseProfileCard from "./course-profile-card/course-profile-card";
import {
  getCourse,
  getLessonFromID,
  getLessonToComplete,
  getPageFromID,
  lessonsLocked,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
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
  const [lessonLocked, setLessonLocked] = useState(false);
  const [loading, setLoad] = useState(true);
  const [lessonIdToScroll, setLessonIdToScroll] = useState("");

  const get_course_information = (course_id) => {
    getCourse(course_id).then((info) => {
      set_course_information(info);
      const lessonId = [...info.lessons];
      getLessonToComplete(lessonId).then((r) => {
        let i = 0;
        while (r[i]) {
          i++;
        }
        setLessonIdToScroll(lessonId[i]);
        change_color(info.color);
        setLoad(false);
      });

      for (const lesson_id of info.lessons) {
        getLessonFromID(lesson_id).then((res) => {
          const pages = res.pages;
          Promise.all(
            pages.map((page) => {
              return getPageFromID(page);
            })
          )
            .then((res) => {
              console.log("Completed the page", res);
            })
            .catch((res) => {
              console.log("Unable to cache pages for lesson :", lesson_id);
            });
        });
      }
    });
  };

  useEffect(() => {
    lessonsLocked().then((isLocked) => {
      setLessonLocked(isLocked);
    });
    get_course_information(course_id);
  }, [course_id]);

  useEffect(() => {
    if (lessonIdToScroll) {
      const elem = document.getElementById(lessonIdToScroll);
      elem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [loading, lessonIdToScroll]);

  const _get_difficulty = () => {
    if (course_information.difficulty === "1") {
      return require("../../assets/Icons/difficulty/easy.svg").default;
    } else if (course_information.difficulty === "2") {
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
      <Helmet>
        <title>{course_information.courseName} | Your App Name</title>
        <meta
          name="description"
          content={`Learn about ${course_information.courseName} in this course. Duration: ${course_information.time} minutes. Difficulty: ${course_information.difficulty}.`}
        />
        <meta property="og:title" content={course_information.courseName} />
        <meta
          property="og:description"
          content={`Learn about ${course_information.courseName} in this course. Duration: ${course_information.time} minutes. Difficulty: ${course_information.difficulty}.`}
        />
        <meta property="og:image" content={course_information.thumbnail} />
        <meta property="og:type" content="website" />
      </Helmet>
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
                course_information.lessons?.map((lesson_id, index) => {
                  return (
                    <LessonCard
                      lesson_id={lesson_id}
                      course_id={course_id}
                      key={index}
                      isLocked={lessonLocked}
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

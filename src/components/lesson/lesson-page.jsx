import React from "react";
import "./lesson-page.css";
import { useSearchParams } from "react-router-dom";
import LessonCard from "../course-page/lesson-card/lesson-card";
import CourseProfileCard from "../course-page/course-profile-card/course-profile-card";

function LessonPage() {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
  and the course id you get is gvhvgvhv
  */
  const searchParams = useSearchParams()[0];
  const lesson_id = searchParams.get("lesson_id");
  const course_id = searchParams.get("course_id");
  const get_course_information = () => {
    return {
      lesson_title: "Extrapolating the Big Idea!",
      lesson_body:
        "# Extrapolating the Big Idea \n \n  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do\n" +
        "                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n" +
        "                enim ad minim veniam, quis nostrud exercitation ullamco laboris\n" +
        "                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor\n" +
        "                in reprehenderit in voluptate velit esse cillum dolore eu fugiat\n" +
        "                nulla pariatur. Excepteur sint occaecat cupidatat non proident,\n" +
        "                sunt in culpa qui officia deserunt",
      difficulty: 3,
    };
  };

  const course_information = get_course_information();
  console.log(course_id);

  return (
    <div className={"course-landing-main"}>
      <div className={"course-landing-title"}>
        {course_information.course_name}
      </div>
      <div className={"course-content-lessons"}>
        <div className={"course-landing-content-section"}>
          <p className={"course-landing-content-title"}>lessons</p>
          <div className={"course-landing-content-section-child"}>
            <LessonCard lesson_id={lesson_id} />
            <LessonCard lesson_id={"lessson 1243"} />
            <LessonCard lesson_id={"lessson 1243"} />
            <LessonCard lesson_id={"lessson 1243"} />
            <LessonCard lesson_id={"lessson 1243"} />
          </div>
        </div>
        <div className={"course-content-card-right"}>
          <CourseProfileCard
            course_name={course_information.course_name}
            course_difficulty={course_information.difficulty}
            course_duration={course_information.duration}
            course_img={course_information.course_image_path}
          />
        </div>
      </div>
    </div>
  );
}

export default LessonPage;

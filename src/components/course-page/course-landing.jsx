import React from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";

import LessonCard from "./lesson-card/lesson-card";
import CourseProfileCard from "./course-profile-card/course-profile-card";

function CourseLanding() {
  /* The URL looks like : http://localhost:3000/course/?course_id=gvhvgvhv
  and the course id you get is gvhvgvhv
  */
  const searchParams = useSearchParams()[0];
  const course_id = searchParams.get("course_id");
  const get_course_information = () => {
    return {
      lessons: [
        "lesson_id_1",
        "lesson_id_2",
        "lesson_id_3",
        "lesson_id_4",
        "lesson_id_5",
        "lesson_id_6",
        "lesson_id_7",
      ],
      course_name: course_id,
      course_image: require("../../assets/courses-notational/course1.png"),
      course_image_path: "../../assets/courses-notational/course1.png",
      difficulty: 3,
      duration: 180,
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
            <LessonCard lesson_id={"lessson 1243"} course_id={course_id} />
            <LessonCard lesson_id={"lessson 1243"} course_id={course_id} />
            <LessonCard lesson_id={"lessson 1243"} course_id={course_id} />
            <LessonCard lesson_id={"lessson 1243"} course_id={course_id} />
            <LessonCard lesson_id={"lessson 1243"} course_id={course_id} />
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

export default CourseLanding;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";

import LessonCard from "./lesson-card/lesson-card";
import CourseProfileCard from "./course-profile-card/course-profile-card";
import { getCourse } from "../../cloud-infrastructure/firebase/firebase";

function CourseLanding() {
  /* The URL looks like : http://localhost:3000/course/?course_id=gvhvgvhv
  and the course id you get is gvhvgvhv
  */
  const search_params = useSearchParams()[0];
  const course_id = search_params.get("course_id");
  const [course_information, set_course_information] = useState({});

  const get_course_information = (course_id) => {
    getCourse(course_id).then((info) => {
      console.log(info);
      set_course_information(info);
    });
  };

  useEffect(() => {
    get_course_information(course_id);
  }, [course_id]);

  return (
    <div className={"course-landing-main"}>
      <div className={"course-landing-title"}>
        {course_information.courseName}
      </div>
      <div className={"course-content-lessons"}>
        <div className={"course-landing-content-section"}>
          <p className={"course-landing-content-title"}>lessons</p>
          <div className={"course-landing-content-section-child"}>
            {course_information &&
              course_information.lessons?.map((lesson_id, index) => {
                return (
                  <LessonCard
                    lesson_id={lesson_id}
                    course_id={course_id}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
        <div className={"course-content-card-right"}>
          <CourseProfileCard
            course_name={course_information.courseName}
            course_difficulty={course_information.difficulty}
            course_duration={course_information.time}
            course_img={course_information.thumbnail}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseLanding;

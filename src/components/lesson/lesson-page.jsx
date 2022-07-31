import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./lesson-page.css";
import { useSearchParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";

function LessonPage() {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
  and the course id you get is gvhvgvhv
  */
  const searchParams = useSearchParams()[0];
  const lesson_id = searchParams.get("lesson_id");
  const course_id = searchParams.get("course_id");

  const get_course_information = (course_id) => {
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
      course_name: "Course Name",
      course_image: require("../../assets/courses-notational/course1.png"),
      course_image_path: "../../assets/courses-notational/course1.png",
      difficulty: 3,
      duration: 180,
    };
  };

  const course_information = get_course_information(course_id);

  const get_lesson_information = (lesson_id) => {
    return {
      lesson_title: "Extrapolating the Big Idea!",
      lesson_id: lesson_id,
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

  const lesson_information = get_lesson_information(lesson_id);

  return (
    <div className={"course-landing-main"}>
      <div className={"lesson-breadcrumbs"}>
        <Breadcrumb className={"lesson-breadcrumb-bar"}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/academy/">Academy</Breadcrumb.Item>
          <Breadcrumb.Item href={`/course/?course_id= ${course_id}`}>
            {course_information.course_name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {lesson_information.lesson_title}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={"course-content-lessons"}>
        <div className={"lesson-landing-content-section"}>
          <div className={"course-landing-content-section-child"}>
            <Markdown className={"lesson-landing-body-markdown"}>
              {lesson_information.lesson_body}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonPage;

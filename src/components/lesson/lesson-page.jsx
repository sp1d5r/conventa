import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./lesson-page.css";
import { useSearchParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import {
  getCourse,
  getLessonFromID,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";

function LessonPage() {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
  and the course id you get is gvhvgvhv
  */
  const searchParams = useSearchParams()[0];
  const lesson_id = searchParams.get("lesson_id");
  const course_id = searchParams.get("course_id");
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourse(course_id).then((res) => {
      setCourse(res);
      getLessonFromID(lesson_id).then((res) => {
        setLesson(res);
        setLoading(false);
      });
    });
  }, [lesson_id, course_id]);

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={"lesson-breadcrumbs"}>
            <Breadcrumb className={"lesson-breadcrumb-bar"}>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/academy/">Academy</Breadcrumb.Item>
              <Breadcrumb.Item href={`/course/?course_id= ${course_id}`}>
                {course.courseName}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{lesson.title}</Breadcrumb.Item>
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
        </>
      )}
    </div>
  );
}

export default LessonPage;

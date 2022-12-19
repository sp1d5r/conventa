import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./lesson-page.css";
import { useSearchParams } from "react-router-dom";
import {
  getCourse,
  getLessonFromID,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import axios from "axios";
import ProgressBar from "./progress-bar/progress-bar";
import LessonContent from "./lesson-content/lesson-content";

const LESSON_CONTENT_EXAMPLE = [
  {
    type: "text",
    content:
      "The mind is one of the most complex and intriguing aspects of human nature. For centuries, philosophers, psychologists and scientists have sought to unravel its mysteries. It is generally believed that the mind influences our behavior and actions, so a great deal of research has gone into understanding the mental processes that lead to both good and bad decisions.",
  },
  {
    type: "question",
    content: {
      question: "What is one way life experiences can affect us?",
      questions: [
        "A. Inheriting biological markers from our parents",
        "B. Consulting with a psychologist",
        "C. Fixing ourselves on our own",
        "D. All of the above",
      ],
      answer: 4,
      explanation:
        "At some point in our lives, we have all either consulted with a psychologist or known someone who has. Life's experiences can break us down in ways we cannot fix on our own, and sometimes these breakdowns are due to certain biological markers we inherited from our parents",
    },
  },
  {
    type: "text",
    content:
      "Some studies of the mind have concentrated on the brain, looking at the physical aspects of how information is acquired, processed, interpreted and stored. These studies hope to get a better understanding of how the brain can affect a person's reasoning. This research has paved the way for progress in managing debilitating conditions like Alzheimer's, perception difficulties and even memory loss.",
  },
  {
    type: "text",
    content:
      "Another familiar aspect of the study of the human mind is psychology. At some point in our lives, we have all either consulted with a psychologist or known someone who has. Life's experiences can break us down in ways we cannot fix on our own, and sometimes these breakdowns are due to certain biological markers we inherited from our parents. Emotions like depression, anxiety and fear can darken our daily experiences and make it difficult to thrive. However, with a combination of drugs and therapy, we can protect ourselves from the darkness within.",
  },
  {
    type: "text",
    content: "What about the darkness in others…",
  },
  {
    type: "text",
    content:
      "Everyone has the capacity for both great good and great evil. Beneath our surface emotions like sadness, depression, joy, and happiness is a deep-seated desire that can lead us to deliberately harm others if those urges are not kept in check. These darker desires are rooted in more primitive instincts like our flight or fight response that promotes our survival. Sometimes there is only one word that adequately describes the human response to these dark emotions...evil.",
  },
  {
    type: "text",
    content:
      "Dark psychology is the study of the human condition in relation to the psychological nature of humans preying on others. In layman's terms, dark psychology explores that aspect of human nature which allows us to take deliberate and willful actions that bring harm to our fellow humans - mind you, use of the term prey does not necessarily translate into physically harming a person (although there is a branch of dark psychology dedicated entirely to this). In subsequent chapters we will touch briefly on those areas related specifically physical violence.",
  },
  {
    type: "text",
    content:
      'In movies or books, you may have come across words or phrases alluding to "a darkness within". Even some famous philosophers made references to this inner darkness. The revered book of Christians talks about how "the heart of man is desperately wicked". We have all encountered at least one individual who we described as being exceptionally calm or reserved in social settings, only for this same individual to perpetrate an act so devious that we find it difficult to associate that act with the person in question. Sometimes, we are that individual. As surprising as it may seem, it is not entirely shocking.',
  },
  {
    type: "text",
    content:
      'These cases are usually just triggered responses to external situations; the pot was stirred so to speak and those dark emotions which were hidden beneath simmered to the surface. Usually they recede back down once control is exerted over them. Everyone has a latent tendency to be a bit naughty or downright evil if the right "buttons" are pushed; some other individuals on the other hand are fully in control of these dark emotions - they nurture them, feed them, and when it serves their own purposes - willfully unleash them at another person\'s expense.',
  },
  {
    type: "text",
    content:
      "Sometimes, these emotions are groomed from an early age. A child learns that if he or she cries in a certain way, the adults in their lives will rushing to do their bidding. If the parents do not impress on the child early enough the wrongness of this behavior, the child grows up thinking people in their lives can be manipulated into doing what they want. The crying would cease to be a weapon as they grow but they would continue using other emotional manipulation tactics.",
  },
  {
    type: "text",
    content:
      "Dark psychology is all about studying the thought process of a person like this. It seeks to understand why someone would carry out these actions, despite knowing it might cause pain to another individual. Dark psychology illuminates the dark side of human nature and provides insight into why someone might act this way.",
  },
];

function NewLessonPage() {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
    and the course id you get is gvhvgvhv
    */
  const searchParams = useSearchParams()[0];
  const lesson_id = searchParams.get("lesson_id");
  const course_id = searchParams.get("course_id");
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  /* Content information */
  const [content, setContent] = useState([]);
  /* Content that gets shown in the area panel */
  const [current_content, setCurrentContent] = useState({});
  /* Keep track of the position the user is at */
  const [current_position, setCurrentPosition] = useState(0);
  /* Keep track of content progress */
  const [user_progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourse(course_id).then((res) => {
      setCourse(res);
      getLessonFromID(lesson_id).then((res) => {
        setLesson(res);
        console.log(res.content);
        axios.get(res.content).then(function (response) {
          // TODO:// use firebase to do this one
          const temp = LESSON_CONTENT_EXAMPLE;
          temp.push({
            type: "final",
            content: {
              title: res.title,
            },
          });
          setContent(temp);
          setCurrentContent(temp[0]);
          setProgress(
            temp.map((_) => {
              return "";
            })
          );
        });
        console.log(user_progress, current_position, current_content, content);
        setLoading(false);
      });
    });
    // eslint-disable-next-line
  }, []);

  const goToPosition = (index) => {
    setCurrentPosition(index);
    setCurrentContent(content[index]);
  };

  const goForward = () => {
    const nextIndex = Math.min(content.length - 1, current_position + 1);
    goToPosition(nextIndex);
  };

  const goBack = () => {
    const lastIndex = Math.max(0, current_position - 1);
    goToPosition(lastIndex);
  };

  //TODO(eahmad): Make a submit button
  const submit = (correctAnswer) => {
    const temp = user_progress;

    console.log(current_content.type);
    if (current_content.type === "question") {
      if (correctAnswer) {
        console.log("here");
        temp[current_position] = "question-answered-green";
      } else {
        temp[current_position] = "question-answered-red";
      }
    }

    if (current_content.type === "text") {
      temp[current_position] = "text-completed";
    }

    if (current_position + 1 <= user_progress.length - 1) {
      temp[current_position + 1] = "furthest";
    }

    setProgress(temp);
    goForward();
  };

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
              <Breadcrumb.Item href={`/course/?course_id=${course_id}`}>
                {course.courseName}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{lesson.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={"course-content-lessons"}>
            <div className={"lesson-landing-content-section"}>
              <div className={"lesson-landing-content-section"}>
                <ProgressBar
                  goBack={goBack}
                  user_progress={user_progress}
                  currentIndex={current_position}
                  goForward={goForward}
                />
                <LessonContent
                  content={current_content.content}
                  status={user_progress[current_position]}
                  type={current_content.type}
                  submit={submit}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewLessonPage;

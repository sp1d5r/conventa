import React, { useEffect, useState } from "react";
import "./lesson-page.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addGemsToUser,
  getCourse,
  getLessonFromID,
  getPageFromID,
  // getPagefromRetrievedJSON,
  getUserClaim,
  logFirebaseEvent,
  lostLife,
  userCompletedLesson,
} from "../../cloud-infrastructure/firebase/firebase";
import ProgressBar from "./progress-bar/progress-bar";
import LessonContent from "./lesson-content/lesson-content";
import { change_color } from "../../cloud-infrastructure/utils/color";
import { Button } from "react-bootstrap";
import Gems from "../../assets/lesson/gem.svg";
import Lives from "../academy/user-card/lives/lives";
import VideoPlayer from "./video-player/video-player";
import LoadingScreen from "../globals/loading-screen/loading-screen";

// const LESSON_CONTENT_EXAMPLE =

function NewLessonPage() {
  /* The URL looks like : http://localhost:3000/lesson/?lesson_id=gvhvgvhv&course_id=course_name
    and the course id you get is gvhvgvhv
    */
  const searchParams = useSearchParams()[0];
  const lesson_id = searchParams.get("lesson_id");
  const lesson_name = searchParams.get("lesson_name");
  const course_id = searchParams.get("course_id");
  const color = searchParams.get("color");

  const [lesson, setLesson] = useState({});
  const [lessonTitle, setLessonTitle] = useState("");
  /* Content information */
  const [content, setContent] = useState([]);
  /* Content that gets shown in the area panel */
  const [current_content, setCurrentContent] = useState({});
  /* Keep track of the position the user is at */
  const [current_position, setCurrentPosition] = useState(0);
  /* Keep track of content progress */
  const [user_progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  /* Navigation */
  const navigator = useNavigate();
  /* Lives Information */
  const [showVideo, setShowVideo] = useState(false);
  const [lifeLost, setLifeLost] = useState(false);
  /* Gems Information */
  const [gems, setGems] = useState(0);
  /* User Claim Information */
  const [userClaim, setUserClaim] = useState("");
  /* LessonStarted */
  const [isIntroScreen, setIntroScreen] = useState(true);

  useEffect(() => {
    getUserClaim().then((res) => {
      setUserClaim(res);
    });
    getCourse(course_id).then((res) => {
      change_color(res.color);
      // TODO:// Get lives lost for today
      getLessonFromID(lesson_id).then((res) => {
        console.log("Lesson result", res);
        setLesson({ ...res });
        setLessonTitle(res.title);
        // Inside lessons we should have pages, update content to represent each of these pages
        const pages = res.pages;

        // TESTING BEGIN
        // let returned_pages;
        // returned_pages = pages.map((page) => {
        //   return getPagefromRetrievedJSON(page, "test");
        // });
        //
        // returned_pages.push({
        //   type: "final",
        //   content: {
        //     title: res.title,
        //   },
        // });
        //
        // setContent(returned_pages);
        // setCurrentContent(returned_pages[0]);
        // setProgress(
        //   returned_pages.map((_) => {
        //     return "";
        //   })
        // );
        // setLoading(false);

        // TESTING END

        // UNCOMMENT FOR PRODUCTION
        Promise.all(
          pages.map((page) => {
            return getPageFromID(page);
          })
        ).then((returned_pages) => {
          // returned_pages = LESSON_CONTENT_EXAMPLE;

          returned_pages.push({
            type: "final",
            content: {
              title: res.title,
            },
          });

          setContent(returned_pages);
          setCurrentContent(returned_pages[0]);
          setProgress(
            returned_pages.map((_) => {
              return "";
            })
          );
          setLoading(false);
        });
      });
    });
    // eslint-disable-next-line
  }, []);

  const goToPosition = (index) => {
    setCurrentPosition(index);
    setCurrentContent(content[index]);
  };

  const goForward = () => {
    logFirebaseEvent("load_page", { page_id: current_content.id });
    const nextIndex = Math.min(content.length - 1, current_position + 1);
    goToPosition(nextIndex);
  };

  const successGemUpdate = (text) => {
    // TODO:// Handle Success Update
    setGems(gems + 30);
    logFirebaseEvent("earned_gems", {
      number_of_gems: 30,
      page_id: current_content.id,
    });
  };

  const failedGemUpdate = (text) => {
    // TODO:// Handle Failed Update
    console.log("Failed to update Gems", text);
  };

  const sendCorrectAnswer = () => {
    addGemsToUser(
      5,
      current_content.id,
      "Standard",
      successGemUpdate,
      failedGemUpdate
    ).then((r) => console.log("completed"));
  };

  const sendIncorrectAnswer = (submittedAnswer) => {
    setShowVideo(true);
    lostLife(current_content.id, submittedAnswer).then((_) => {
      setLifeLost(!lifeLost);
      logFirebaseEvent("lost_life", { page_id: current_content.id });
    });
  };

  const lifeLostAnimationEnd = () => {
    setShowVideo(false);
  };

  //TODO(eahmad): Make a submit button
  const submit = (correctAnswer, submittedAnswer) => {
    const temp = user_progress;

    if (
      current_content.type === "question" ||
      current_content.type === "selection_text" ||
      current_content.type === "single_word" ||
      current_content.type === "build_sentence" ||
      current_content.type === "selection_image" ||
      current_content.type === "match_cards" ||
      current_content.type === "order_list" ||
      current_content.type === "binary_classifier"
    ) {
      if (correctAnswer) {
        /* This is the correct answer*/
        sendCorrectAnswer();
      } else {
        sendIncorrectAnswer(submittedAnswer);
      }
    }

    if (current_content.type === "text") {
      temp[current_position] = "text-completed";
    }

    setProgress(temp);
    goForward();
  };

  const updateUserInfoLessonComplete = async () => {
    // TODO:// Add the gems earned to the current user
    return userCompletedLesson(lesson_id, course_id);
  };

  const lessonCompleteSubmit = () => {
    updateUserInfoLessonComplete().then(() => {
      navigator(`/course/?course_id=${course_id}`);
    });
  };

  const lessonCompleteBack = () => {
    updateUserInfoLessonComplete()
      .then((_) => {
        window.location.reload();
      })
      .catch((e) => {
        window.location.reload();
      });
  };

  const lessonCompleteNextLesson = () => {
    updateUserInfoLessonComplete().then(() => {
      navigator(`/course/?course_id=${course_id}`);
    });
  };

  return (
    <div className={"course-landing-main"}>
      {loading ? (
        <LoadingScreen color={color} title={lesson_name} />
      ) : (
        <div className={"lesson-landing-main"}>
          {showVideo && (
            <VideoPlayer
              // videoSrc="../../../assets/heart_died.mp4" // Replace with the path to your video file
              onVideoEnded={lifeLostAnimationEnd}
            />
          )}
          {isIntroScreen ? (
            <div className={"lesson-intro-page"}>
              <img src={lesson.thumbnail} alt={"hello"} />
              <p className={"lesson-intro-title"}>{lesson.title}</p>
              <p>{lesson.description}</p>
              <p
                className={"lesson-intro-action"}
                onClick={() => {
                  setIntroScreen(false);
                }}
              >
                Tap to continue
              </p>
            </div>
          ) : (
            <div className={"lesson-landing-content-section"}>
              <div className={"lesson-top"}>
                <ProgressBar
                  currentProgress={Math.min(
                    current_position + 1,
                    content.length
                  )}
                  totalPages={content.length}
                />
                <div className={"lesson-metadata"}>
                  {current_content.type !== "final" ? (
                    <Button
                      variant={"danger"}
                      onClick={() => {
                        navigator(`/course/?course_id=${course_id}`);
                      }}
                      className={"lesson-button"}
                    >
                      Exit
                    </Button>
                  ) : (
                    <></>
                  )}
                  <p className={"lesson-title"}>{lesson.title}</p>
                  <div className={"lesson-user-data"}>
                    {console.log("user claim", userClaim)}
                    <Lives lifeLost={lifeLost} redirect={userClaim === ""} />

                    <div className={"user-gems"}>
                      <p className={"amount-of-gems"}>{gems}</p>
                      <img src={Gems} alt={"Gems Earned"} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className={"lesson-title-mobile"}>{lessonTitle}</p>
              </div>

              <LessonContent
                pageId={current_content.id}
                lessonId={lesson_id}
                courseId={course_id}
                content={current_content.content}
                status={user_progress[current_position]}
                type={current_content.type}
                submit={submit}
                lessonCompleteSubmit={lessonCompleteSubmit}
                lessonCompleteBack={lessonCompleteBack}
                lessonCompleteNextLesson={lessonCompleteNextLesson}
                gems={gems}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NewLessonPage;

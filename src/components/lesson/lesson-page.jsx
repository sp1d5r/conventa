import React, { useEffect, useState } from "react";
import "./lesson-page.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addGemsToUser,
  getCourse,
  getLessonFromID,
  getPageFromID,
  getUserClaim,
  lostLife,
  userCompletedLesson,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import ProgressBar from "./progress-bar/progress-bar";
import LessonContent from "./lesson-content/lesson-content";
import { change_color } from "../../cloud-infrastructure/utils/color";
import { Button } from "react-bootstrap";
import Gems from "../../assets/lesson/gem.svg";
import Lives from "../academy/user-card/lives/lives";

const LESSON_CONTENT_EXAMPLE = [
  {
    id: "binary_classification",
    type: "binary_classification",
    content: {
      mapping: {
        "Distributive Negotiation": [
          "Dividing a Fixed Resource",
          "Win-Lose Outcome",
        ],
        "Integrative Negotiation": [
          "Creating value for all parties",
          "Win-Win Outcome",
        ],
      },
    },
  },
  {
    id: "order_list",
    type: "order_list",
    content: ["Preparation", "Discussion", "Clarification", "Negotiation"],
  },
  {
    id: "test",
    type: "case_study",
    content: {
      title: "Woman brutally attacked in her home",
      story:
        "This was a tragic story of a woman who was viciously attacked in her own home. The perpetrator had carefully planned the attack, and waited for the perfect opportunity to strike. He then brutally beat the woman and left her for dead. Thankfully, she was discovered by a neighbour who called for help. She was rushed to the hospital where she thankfully recovered from her injuries. The police later found out the perpetrator was a high school friend of the victim. The attack seemed to be orchestrated for a while and the victim was not expecting it.",
    },
  },
  {
    id: "test",
    type: "match_cards",
    content: {
      mapping: {
        "Not all exceptions are": "valid",
        "Objections to the sale should be": "encouraged",
        "Objections to a sale are ": "good",
        "Discover exceptions by": "asking questions",
      },
    },
  },
  {
    id: "test",
    type: "flip_and_select",
    content: {
      mapping: {
        "Not all exceptions are": "valid",
        "Objections to the sale should be": "encouraged",
        "Objections to a sale are ": "good",
        "Discover exceptions by": "asking questions",
      },
    },
  },
  {
    id: "test",
    type: "single_word",
    content: {
      sentence: "Objections to the sale should be ",
      word: "encouraged",
    },
  },
  {
    id: "test",
    type: "build_sentence",
    content: "Objections to the sale should be encouraged.",
  },
  {
    id: "test",
    type: "selection_image",
    content: {
      question: "Objections to the sale should be  __________.",
      questions: [
        {
          src: "/lesson-notional/encouraged.png",
          content: "encouraged",
        },
        {
          src: "/lesson-notional/questioned.png",
          content: "questioned",
        },
        {
          src: "/lesson-notional/shot-down.png",
          content: "shot-down",
        },
        {
          src: "/lesson-notional/ignored.png",
          content: "ignored",
        },
      ],
      answer: 1,
    },
  },
  {
    id: "test",
    type: "selection_text",
    content: {
      question: "How should you address objections?",
      questions: ["Asking Questions", "Directly", "Indirectly", "Creatively"],
      answer: 1,
    },
  },
  {
    type: "text",
    content:
      "The mind is one of the most complex and intriguing aspects of human nature. For centuries, philosophers, psychologists and scientists have sought to unravel its mysteries. It is generally believed that the mind influences our behavior and actions, so a great deal of research has gone into understanding the mental processes that lead to both good and bad decisions.",
  },
  {
    id: "test",
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
  const [lifeLost, setLifeLost] = useState(false);
  /* Gems Information */
  const [gems, setGems] = useState(0);
  /* User Claim Information */
  const [userClaim, setUserClaim] = useState("");

  useEffect(() => {
    getUserClaim().then((res) => {
      setUserClaim(res);
    });
    getCourse(course_id).then((res) => {
      change_color(res.color);
      // TODO:// Get lives lost for today
      getLessonFromID(lesson_id).then((res) => {
        // Inside lessons we should have pages, update content to represent each of these pages
        console.log(res);
        const pages = res.pages;
        Promise.all(
          pages.map((page) => {
            return getPageFromID(page);
          })
        ).then((returned_pages) => {
          returned_pages = LESSON_CONTENT_EXAMPLE;
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
    const nextIndex = Math.min(content.length - 1, current_position + 1);
    goToPosition(nextIndex);
  };

  const successGemUpdate = (text) => {
    // TODO:// Handle Success Update
    setGems(gems + 30);
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
    lostLife(current_content.id, submittedAnswer).then((_) =>
      setLifeLost(!lifeLost)
    );
  };

  //TODO(eahmad): Make a submit button
  const submit = (correctAnswer, submittedAnswer) => {
    console.log(correctAnswer, submittedAnswer);
    const temp = user_progress;

    if (
      current_content.type === "question" ||
      current_content.type === "selection_text" ||
      current_content.type === "single_word" ||
      current_content.type === "build_sentence" ||
      current_content.type === "selection_image" ||
      current_content.type === "match_cards"
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
    return userCompletedLesson(lesson_id);
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
        <Loading />
      ) : (
        <>
          <div className={"lesson-landing-main"}>
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
                  <Button
                    variant={"danger"}
                    onClick={() => {
                      navigator(`/course/?course_id=${course_id}`);
                    }}
                  >
                    Exit
                  </Button>
                  <div className={"lesson-user-data"}>
                    <Lives lifeLost={lifeLost} redirect={userClaim === ""} />

                    <div className={"user-gems"}>
                      <p className={"amount-of-gems"}>{gems}</p>
                      <img src={Gems} alt={"Gems Earned"} />
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
              <LessonContent
                content={current_content.content}
                status={user_progress[current_position]}
                type={current_content.type}
                submit={submit}
                lessonCompleteSubmit={lessonCompleteSubmit}
                lessonCompleteBack={lessonCompleteBack}
                lessonCompleteNextLesson={lessonCompleteNextLesson}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewLessonPage;

/*
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
* */

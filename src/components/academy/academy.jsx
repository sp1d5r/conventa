import React, { useEffect, useState } from "react";
import "./academy.css";
import CourseCard from "./course-card/course-card";
import MiniGameCard from "./minigame-card/minigame-card";
import {
  getBanner,
  getCourses,
  getLessonToComplete,
  getUserClaim,
  lessonsLocked,
  logAcademyStart,
} from "../../cloud-infrastructure/firebase/firebase";
import { Breadcrumb } from "react-bootstrap";
import Banner from "./banner/banner";
import UserCard from "./user-card/user-card";
import { change_color } from "../../cloud-infrastructure/utils/color";
import AssessmentCard from "./assessment-card/assessment-card";
import { useAuth } from "../../cloud-infrastructure/firebase/auth";
import SkeletonCard from "./skeleton-card/skeleton-card";
import FeaturedCard from "./featured-card/featured-card";

function Academy() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});
  const [lessonLocked, setLessonLocked] = useState(false);
  const [accountType, setAccountType] = useState("Upgrade!");
  const { current_user } = useAuth();

  function calculateTruePercentage(boolArr) {
    const trueCount = boolArr.filter((bool) => bool === true).length;
    const total = boolArr.length;
    const truePercentage = (trueCount / total) * 100;

    return Math.round(truePercentage);
  }

  const getLessonsCompleteForCourse = async (course) => {
    const currentCourse = { ...course };
    const lessonId = [...course.lessons].map((elem) => {
      return elem._key.path.segments[elem._key.path.segments.length - 1];
    });
    await getLessonToComplete(lessonId)
      .then((r) => {
        currentCourse["courseProgress"] = calculateTruePercentage(r);
      })
      .catch((err) => {
        console.log("Failed to get number of lessons complete", err);
        currentCourse["courseProgress"] = 0;
      });
    return currentCourse;
  };

  const courseItems = () => {
    getCourses()
      .then((_courses) => {
        lessonsLocked()
          .then((isLocked) => {
            getUserClaim()
              .then((account) => {
                Promise.all(
                  _courses.map((elem) => {
                    return getLessonsCompleteForCourse(elem);
                  })
                )
                  .then((updatedCourses) => {
                    setLessonLocked(isLocked);
                    updatedCourses.sort((a, b) =>
                      a.courseProgress < b.courseProgress ? 1 : -1
                    );
                    setCourses(updatedCourses);
                    setAccountType(account);
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.log(
                      "Failed to get progress for courses: ",
                      _courses,
                      err
                    );
                    setLessonLocked(isLocked);
                    setCourses(
                      _courses.map((elem) => {
                        return { courseProgress: 0, ...elem };
                      })
                    );
                    setAccountType(account);
                    setLoading(false);
                  });
              })
              .catch((err) => {
                console.log("Error getting Claim", err);
                setLessonLocked(isLocked);
                setCourses(_courses);
                setLoading(false);
              });
          })
          .catch((err) => {
            console.log("Error getting Lesson", err);
            setCourses(
              _courses.map((elem) => {
                return { courseProgress: 0, ...elem };
              })
            );
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getBannerFromFirebase = () => {
    getBanner()
      .then((_banner) => {
        setBanner(_banner);
      })
      .catch((err) => {
        console.log("Unable to get banner", err);
        setBanner({ promoMessage: "", color: "" });
      });
  };

  const minigameItems = () => {
    return [
      // {
      //   imagePath: require("../../assets/minigame-notational/minigame1.png"),
      //   title: "First Impressions",
      //   time: 30,
      //   difficulty: 0,
      // },
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "Catch a Liar",
        time: 30,
        difficulty: 1,
      },
      {
        imagePath: require("../../assets/minigame-notational/minigame2.png"),
        title: "Effective Speaking",
        time: 30,
        difficulty: 0,
      },
      {
        imagePath: require("../../assets/minigame-notational/negotiation-roleplay.png"),
        title: "Negotiation Roleplay",
        time: 30,
        difficulty: 1,
      },
      {
        imagePath: require("../../assets/minigame-notational/concessions-ladder.png"),
        title: "Concession Ladder",
        time: 30,
        difficulty: 2,
      },
      {
        imagePath: require("../../assets/minigame-notational/empathy-challenge.png"),
        title: "Empathy Challenge",
        time: 30,
        difficulty: 0,
      },
    ];
  };

  const assessmentItems = () => {
    return [
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "Negotiation Assessment",
        badges: ["Negotiation"],
        subtext: "Simulate a Negotiation ",
        time: 30,
        difficulty: 2,
        color: "#FFEDED",
      },
      // {
      //   imagePath: require("../../assets/minigame-notational/minigame1.png"),
      //   title: "Inspiration Trainer",
      //   badges: ["Body Language"],
      //   subtext: "Inspire a collegue to join you",
      //   time: 30,
      //   difficulty: 2,
      //   color: "#E3FDFF",
      // },
    ];
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
  }, []); // eslint-disable-line

  useEffect(() => {
    courseItems();
    logAcademyStart();
    getBannerFromFirebase();
    change_color("#CBFFD8");
  }, [current_user]); // eslint-disable-line

  return (
    <div className={"academy-main"}>
      <div className={"academy-heading"}>
        <div className={"academy-heading-title"}>
          {window.innerWidth < 100 ? (
            <div className={"course-breadcrumbs"}>
              <Breadcrumb className={"lesson-breadcrumb-bar"}>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active={true} href="/academy/">
                  Academy
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          ) : (
            <></>
          )}
          <p className={"academy-title"}>Academy</p>
          <p className={"dedicated-tag"}>Dedicated to Nadia ♥</p>
        </div>
        {current_user && current_user.uid && (
          <UserCard isLoading={loading} key={current_user} />
        )}
      </div>

      {banner && banner.promoMessage && banner.color ? (
        <Banner promoMessage={banner.promoMessage} color={banner.color} />
      ) : (
        <></>
      )}
      <div className={"academy-content"}>
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>All Courses</p>
          <div className={"academy-content-section-child"}>
            {}

            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : courses.map((item, index) => {
                  return (
                    <CourseCard
                      imagePath={item.thumbnail}
                      title={item.courseName}
                      description={item.description}
                      id={item.id}
                      locked={lessonLocked}
                      time={item.time}
                      courseProgress={item.courseProgress}
                      color={item.color}
                      key={index}
                    />
                  );
                })}
          </div>
        </div>
        <br />
        <br />
        <FeaturedCard />
        <br />
        <br />

        {/* Business Psychology */}
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>Business Psychology</p>
          <div className={"academy-content-section-child"}>
            {}

            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : courses
                  .filter((item) => {
                    return item.tags.includes("Business Psychology");
                  })
                  .map((item, index) => {
                    return (
                      <CourseCard
                        imagePath={item.thumbnail}
                        title={item.courseName}
                        description={item.description}
                        id={item.id}
                        locked={lessonLocked}
                        time={item.time}
                        courseProgress={item.courseProgress}
                        color={item.color}
                        key={index}
                      />
                    );
                  })}
          </div>
        </div>
        <br />
        <br />

        {/* Relationship Psychology */}
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>Relationship Psychology</p>
          <div className={"academy-content-section-child"}>
            {}

            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : courses
                  .filter((item) => {
                    return item.tags.includes("Relationship Psychology");
                  })
                  .map((item, index) => {
                    return (
                      <CourseCard
                        imagePath={item.thumbnail}
                        title={item.courseName}
                        description={item.description}
                        id={item.id}
                        locked={lessonLocked}
                        time={item.time}
                        courseProgress={item.courseProgress}
                        color={item.color}
                        key={index}
                      />
                    );
                  })}
          </div>
        </div>
        <br />
        <br />

        {/* */}
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>Theories</p>
          <div className={"academy-content-section-child"}>
            {}

            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : courses
                  .filter((item) => {
                    return item.tags.includes("Theories");
                  })
                  .map((item, index) => {
                    return (
                      <CourseCard
                        imagePath={item.thumbnail}
                        title={item.courseName}
                        description={item.description}
                        id={item.id}
                        locked={lessonLocked}
                        time={item.time}
                        courseProgress={item.courseProgress}
                        color={item.color}
                        key={index}
                      />
                    );
                  })}
          </div>
        </div>
        <br />
        <br />
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>minigames</p>
          <div className={"academy-content-section-child"}>
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : minigameItems().map((item, index) => {
                  return (
                    <MiniGameCard
                      imagePath={item.imagePath}
                      title={item.title}
                      time={item.time}
                      locked={!current_user} //&& accountType === "Upgrade!"}
                      difficulty={item.difficulty}
                      key={index}
                    />
                  );
                })}
          </div>
        </div>
        <br />
        <br />
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>assessment</p>
          <div className={"academy-content-section-child"}>
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                  return <SkeletonCard key={index} />;
                })
              : assessmentItems().map((item, index) => {
                  return (
                    <AssessmentCard
                      color={item.color}
                      imagePath={item.imagePath}
                      title={item.title}
                      locked={
                        false &&
                        (accountType === "Hobbiest" ||
                          accountType === "Amateur" ||
                          accountType === "Upgrade!")
                      }
                      subtext={item.subtext}
                      difficulty={item.difficulty}
                      key={index}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academy;

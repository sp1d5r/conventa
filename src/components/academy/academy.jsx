import React, { useEffect, useState } from "react";
import "./academy.css";
import CourseCard from "./course-card/course-card";
import MiniGameCard from "./minigame-card/minigame-card";
import {
  getBanner,
  getCourses,
  getUserClaim,
  lessonsLocked,
  logAcademyStart,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import { Breadcrumb } from "react-bootstrap";
import Banner from "./banner/banner";
import UserCard from "./user-card/user-card";
import { change_color } from "../../cloud-infrastructure/utils/color";
import ImitationCard from "./imitation-card/imitation-card";

function Academy() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});
  const [lessonLocked, setLessonLocked] = useState(false);
  const [accountType, setAccountType] = useState("Upgrade!");

  const courseItems = () => {
    getCourses()
      .then((_courses) => {
        lessonsLocked()
          .then((isLocked) => {
            getUserClaim()
              .then((account) => {
                setLessonLocked(isLocked);
                setCourses(_courses);
                setAccountType(account);
                setLoading(false);
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
            setCourses(_courses);
            setLoading(false);
          });
      })
      .catch(() => {
        console.log("here");
        setLoading(false);
      });
  };

  const getBannerFromFirebase = () => {
    getBanner()
      .then((_banner) => {
        console.log("here");
        setBanner(_banner);
      })
      .catch((err) => {
        console.log("Unable to get banner", err);
        setBanner({ promoMessage: "", color: "" });
      });
  };

  const getLessonsLocked = () => {};

  const minigameItems = () => {
    return [
      // {
      //   imagePath: require("../../assets/minigame-notational/minigame1.png"),
      //   title: "First Impressions",
      //   time: 30,
      //   difficulty: 0,
      // },
      {
        imagePath: require("../../assets/minigame-notational/minigame2.png"),
        title: "Catch a Liar",
        time: 30,
        difficulty: 1,
      },
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "Effective Speaking",
        time: 30,
        difficulty: 0,
      },
    ];
  };

  const imitationItems = () => {
    return [
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "John Wick",
        badges: ["Body Language"],
        subtext: "Command respect if you're quiet",
        time: 30,
        difficulty: 0,
        color: "#ECFFE3",
      },
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "Thomas Shelby",
        badges: ["Body Language"],
        subtext: "Remain calm under pressure",
        time: 30,
        difficulty: 0,
        color: "#E3FDFF",
      },
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
  }, []);

  useEffect(() => {
    courseItems();
    logAcademyStart();
    getBannerFromFirebase();
    change_color("#E3FFEA");
    getLessonsLocked();
  }, []);

  return (
    <div className={"academy-main"}>
      <div className={"course-breadcrumbs"}>
        <Breadcrumb className={"lesson-breadcrumb-bar"}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active={true} href="/academy/">
            Academy
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={"academy-title"}>
        <p>Academy</p>
      </div>

      {banner && banner.promoMessage && banner.color ? (
        <Banner promoMessage={banner.promoMessage} color={banner.color} />
      ) : (
        <></>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className={"academy-content"}>
          <UserCard />

          <div className={"academy-content-section"}>
            <p className={"academy-content-title"}>courses</p>
            <div className={"academy-content-section-child"}>
              {courses.map((item, index) => {
                return (
                  <CourseCard
                    imagePath={item.thumbnail}
                    title={item.courseName}
                    id={item.id}
                    locked={lessonLocked}
                    time={item.time}
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
              {minigameItems().map((item, index) => {
                return (
                  <MiniGameCard
                    imagePath={item.imagePath}
                    title={item.title}
                    time={item.time}
                    locked={accountType === "Upgrade!"}
                    difficulty={item.difficulty}
                  />
                );
              })}
            </div>
          </div>
          <br />
          <br />
          <div className={"academy-content-section"}>
            <p className={"academy-content-title"}>imitation</p>
            <div className={"academy-content-section-child"}>
              {imitationItems().map((item, index) => {
                return (
                  <ImitationCard
                    color={item.color}
                    imagePath={item.imagePath}
                    title={item.title}
                    locked={
                      true
                      // accountType === "Hobbiest" ||
                      // accountType === "Amateur" ||
                      // accountType === "Upgrade!"
                    }
                    subtext={item.subtext}
                    difficulty={item.difficulty}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Academy;

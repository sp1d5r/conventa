import React, { useEffect, useState } from "react";
import "./academy.css";
import CourseCard from "./course-card/course-card";
import MiniGameCard from "./minigame-card/minigame-card";
import {
  getBanner,
  getCourses,
  logAcademyStart,
} from "../../cloud-infrastructure/firebase/firebase";
import Loading from "../loading/loading";
import { Breadcrumb } from "react-bootstrap";
import Banner from "./banner/banner";
import UserCard from "./user-card/user-card";
import { change_color } from "../../cloud-infrastructure/utils/color";

function Academy({ loggedIn }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState({});

  const courseItems = () => {
    getCourses().then((_courses) => {
      setCourses(_courses);
      setLoading(false);
    });
  };

  const getBannerFromFirebase = () => {
    getBanner().then((_banner) => {
      setBanner(_banner);
    });
  };

  const minigameItems = () => {
    return [
      {
        imagePath: require("../../assets/minigame-notational/minigame1.png"),
        title: "First Impressions",
        time: 30,
        difficulty: 0,
      },
      {
        imagePath: require("../../assets/minigame-notational/minigame2.png"),
        title: "Catch a Liar",
        time: 30,
        difficulty: 1,
      },
      {
        imagePath: require("../../assets/minigame-notational/minigame3.png"),
        title: "Tracking Client Emotions",
        time: 30,
        difficulty: 2,
      },
    ];
  };

  useEffect(() => {
    courseItems();
    logAcademyStart();
    getBannerFromFirebase();
    change_color("#E3FFEA");
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

      {banner.promoMessage && banner.color ? (
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
            <div className={"academy-content-section-child-minigame"}>
              {minigameItems().map((item, index) => {
                return (
                  <MiniGameCard
                    imagePath={item.imagePath}
                    title={item.title}
                    time={item.time}
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

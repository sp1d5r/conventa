import React from "react";
import "./academy.css";
import CourseCard from "./course-card/course-card";
import MiniGameCard from "./minigame-card/minigame-card";

function Academy({ loggedIn }) {
  const courseItems = () => {
    return [
      {
        imagePath: require("../../assets/courses-notational/course1.png"),
        title: "Expressing Emotions",
        id: "12345",
        time: 30,
      },
      {
        imagePath: require("../../assets/courses-notational/course2.png"),
        title: "Self Control",
        id: "123456",
        time: 30,
      },
      {
        imagePath: require("../../assets/courses-notational/course3.png"),
        title: "Recognising Danger",
        id: "1234567",
        time: 30,
      },
      {
        imagePath: require("../../assets/courses-notational/course4.png"),
        title: "Manipulating People",
        id: "12345678",
        time: 30,
      },
    ];
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

  return (
    <div className={"academy-main"}>
      <div className={"academy-title"}>
        {loggedIn ? <p>Welcome Back!</p> : <p>Academy</p>}
      </div>
      <div className={"academy-content"}>
        <div className={"academy-content-section"}>
          <p className={"academy-content-title"}>courses</p>
          <div className={"academy-content-section-child"}>
            {courseItems().map((item, index) => {
              return (
                <CourseCard
                  imagePath={item.imagePath}
                  title={item.title}
                  id={item.id}
                  time={item.time}
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
    </div>
  );
}

export default Academy;

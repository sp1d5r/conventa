import React from "react";
import "./user-card.css";
import StreakDay from "./streak-day/streak-day";

function UserCard() {
  const NUMBER_STREAK_REQUIRED = 5;
  const streak = 2;
  const longest_streak = 4;
  const lessons_completed = 45;

  return (
    <>
      <div className={"user-card-div"}>
        <div
          className={`user-information ${
            window.innerWidth > 700 ? "border-right" : ""
          }`}
        >
          <svg className="circular-loader" viewBox="25 25 50 50">
            {/* circumference 62.8*/}
            <circle
              className="loader-path"
              cx="50"
              cy="50"
              r="10"
              fill="none"
              stroke={"#ededed"}
            ></circle>
            <circle
              className="loader-path"
              cx="50"
              cy="50"
              r="10"
              fill="none"
              stroke="#3483eb"
              strokeDasharray={`${
                Math.min(3, streak) *
                Math.round(62.8 / NUMBER_STREAK_REQUIRED, 1)
              } 62`}
            ></circle>
            <text
              x="47"
              y="54"
              fontFamily={"Lexend"}
              fill={"#000000"}
              fontSize={"10px"}
            >
              {streak}
            </text>
          </svg>
          <div className={"text-left left-hand-div"}>
            <p className={"user-info-text"}>Welcome Back!</p>
            <p className={"user-info-text-p"}>
              Complete <span className={"bold"}>{NUMBER_STREAK_REQUIRED}</span>{" "}
              lessons daily to start a streak!
            </p>
            <div className={"text-mute"}>
              <p>{longest_streak} Longest Streak</p>
              <p>{lessons_completed} Courses Completed</p>
            </div>
          </div>
        </div>

        <div className={"streak-information"}>
          <StreakDay today={true} day={"Su"} streak={false} />
          <StreakDay today={false} day={"M"} streak={false} />
          <StreakDay today={false} day={"Tu"} streak={false} />
          <StreakDay today={false} day={"W"} streak={false} />
          <StreakDay today={false} day={"Th"} streak={false} />
          <StreakDay today={false} day={"F"} streak={false} />
          <StreakDay today={false} day={"Sa"} streak={false} />
        </div>
      </div>
    </>
  );
}

export default UserCard;

import React, { useEffect, useState } from "react";
import "./user-card.css";
import StreakDay from "./streak-day/streak-day";
import { getLessonsCompletedForDay } from "../../../cloud-infrastructure/firebase/firebase";

function UserCard() {
  const NUMBER_STREAK_REQUIRED = 5;
  const [streak, setStreak] = useState(0);
  const longest_streak = 4;
  const lessons_completed = 45;
  const today = new Date();
  const [sunday, setSunday] = useState(); // ;)
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();
  const [saturday, setSaturday] = useState();

  useEffect(() => {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    setSunday(new Date(curr.setDate(first)));
    setMonday(new Date(curr.setDate(first + 1)));
    setTuesday(new Date(curr.setDate(first + 2)));
    setWednesday(new Date(curr.setDate(first + 3)));
    setThursday(new Date(curr.setDate(first + 4)));
    setFriday(new Date(curr.setDate(first + 5)));
    setSaturday(new Date(curr.setDate(first + 6)));
    getLessonsCompletedForDay(today).then((res) => {
      console.log(res);
      setStreak(res);
    });
    // eslint-disable-next-line
  }, []);

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
              r="20"
              fill="none"
              stroke={"#ededed"}
              strokeWidth={"5px"}
            ></circle>
            <circle
              className="loader-path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#3483eb"
              strokeDasharray={`${
                Math.min(5, streak) *
                Math.round(125.7 / NUMBER_STREAK_REQUIRED, 1)
              } 125.7`}
            ></circle>
            <text
              x="45"
              y="56"
              fontFamily={"Lexend"}
              fill={"#000000"}
              fontSize={"18px"}
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
          {sunday && (
            <StreakDay
              today={today.getTime() === sunday.getTime()}
              day={"Su"}
              date={sunday}
            />
          )}
          {monday && (
            <StreakDay
              today={today.getTime() === monday.getTime()}
              day={"M"}
              date={monday}
            />
          )}
          {tuesday && (
            <StreakDay
              today={today.getTime() === tuesday.getTime()}
              day={"Tu"}
              date={tuesday}
            />
          )}
          {wednesday && (
            <StreakDay
              today={today.getTime() === wednesday.getTime()}
              day={"W"}
              date={wednesday}
            />
          )}
          {thursday && (
            <StreakDay
              today={today.getTime() === thursday.getTime()}
              day={"Th"}
              date={thursday}
            />
          )}
          {friday && (
            <StreakDay
              today={today.getTime() === friday.getTime()}
              day={"F"}
              date={friday}
            />
          )}
          {saturday && (
            <StreakDay
              today={today.getTime() === saturday.getTime()}
              day={"Sa"}
              date={saturday}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UserCard;

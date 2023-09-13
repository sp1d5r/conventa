import React, { useEffect, useState } from "react";
import "./user-card.css";
import StreakDay from "./streak-day/streak-day";
import {
  getLessonsCompleted,
  getLessonsCompletedForDay,
  getUserClaim,
} from "../../../cloud-infrastructure/firebase/firebase";
import Lives from "./lives/lives";
import { Link } from "react-router-dom";
import TotalGems from "./gems/gems";

function UserCard({ isLoading }) {
  const NUMBER_STREAK_REQUIRED = 1;
  const [streak, setStreak] = useState(0);
  const [today, setToday] = useState(new Date());
  const [sunday, setSunday] = useState(); // ;)
  const [monday, setMonday] = useState();
  const [tuesday, setTuesday] = useState();
  const [wednesday, setWednesday] = useState();
  const [thursday, setThursday] = useState();
  const [friday, setFriday] = useState();
  const [saturday, setSaturday] = useState();
  const [lessons_completed, setLessonsCompleted] = useState(0);
  // const current_user = auth.currentUser;
  const [role, setRole] = useState("Upgrade!");

  const cleanDate = (date) => {
    const temp = new Date(date);
    temp.setHours(0, 0, 0, 0);
    return temp;
  };

  useEffect(() => {
    var curr = new Date(); // get current date
    setToday(cleanDate(curr.getDate()));
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    setSunday(cleanDate(curr.setDate(first)));
    setMonday(cleanDate(curr.setDate(first + 1)));
    setTuesday(cleanDate(curr.setDate(first + 2)));
    setWednesday(cleanDate(curr.setDate(first + 3)));
    setThursday(cleanDate(curr.setDate(first + 4)));
    setFriday(cleanDate(curr.setDate(first + 5)));
    setSaturday(cleanDate(curr.setDate(first + 6)));
    getLessonsCompletedForDay(today).then((res) => {
      setStreak(res);
    });
    getLessonsCompleted().then((res) => {
      setLessonsCompleted(res);
    });

    getUserClaim().then((res) => {
      let r = res;
      console.log("User Claim", res);
      if (res === "Hobbiest" || res === "Amateur") {
        r = res + " ^";
      }
      setRole(r);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={"user-card-div"}>
        <div>
          <div className={"streak-information"}>
            {today && sunday && (
              <StreakDay
                today={today.getTime() === sunday.getTime()}
                day={"Su"}
                date={sunday}
                isLoading={isLoading}
              />
            )}
            {today && monday && (
              <StreakDay
                today={today.getTime() === monday.getTime()}
                day={"Mo"}
                date={monday}
                isLoading={isLoading}
              />
            )}
            {tuesday && (
              <StreakDay
                today={today.getTime() === tuesday.getTime()}
                day={"Tu"}
                date={tuesday}
                isLoading={isLoading}
              />
            )}
            {today && wednesday && (
              <StreakDay
                today={today.getTime() === wednesday.getTime()}
                day={"We"}
                date={wednesday}
                isLoading={isLoading}
              />
            )}
            {today && thursday && (
              <StreakDay
                today={today.getTime() === thursday.getTime()}
                day={"Th"}
                date={thursday}
                isLoading={isLoading}
              />
            )}
            {today && friday && (
              <StreakDay
                today={today.getTime() === friday.getTime()}
                day={"Fr"}
                date={friday}
                isLoading={isLoading}
              />
            )}
            {today && saturday && (
              <StreakDay
                today={today.getTime() === saturday.getTime()}
                day={"Sa"}
                date={saturday}
                isLoading={isLoading}
              />
            )}
          </div>
          <div
            className={`lessons-complete ${
              isLoading ? "skeleton-loading " : ""
            }`}
          >
            <div
              className={"lesson-progress-bar"}
              style={{ width: `${(streak / NUMBER_STREAK_REQUIRED) * 100}%` }}
            ></div>
            <div className={"lesson-complete-text"}>
              {lessons_completed} Lessons Completed
            </div>
          </div>
          <div className={"additional-info"}>
            <Lives lifeLost={false} />
            <TotalGems />
            {role === "Professional" ? (
              <span className={"user-button-badge"}>{role}</span>
            ) : (
              <Link to={"/pricing-page"} className={"user-button-badge"}>
                {role}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;

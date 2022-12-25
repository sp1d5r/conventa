import React, { useEffect, useState } from "react";
import "./streak-day.css";
import { userStreakForDay } from "../../../../cloud-infrastructure/firebase/firebase";

function StreakDay({ today, day, date }) {
  const [streak, setStreak] = useState(false);
  useEffect(() => {
    userStreakForDay(date).then((res) => {
      setStreak(res);
    });
  }, [date]);

  return (
    <>
      <div
        className={`streak-day ${today ? "yellow-streak" : ""}  ${
          streak ? "blue-streak" : ""
        }`}
      >
        <p className={`${today ? "text-bold" : ""} streak-day-text`}>{day}</p>
        <p className={`${today ? "text-bold" : ""} streak-day-text`}>Ψ</p>
      </div>
    </>
  );
}

export default StreakDay;

import React, { useEffect, useState } from "react";
import "./streak-day.css";
import { userStreakForDay } from "../../../../cloud-infrastructure/firebase/firebase";

function StreakDay({ day, date, isLoading }) {
  const [streak, setStreak] = useState(false);
  const [today, setToday] = useState(false);
  useEffect(() => {
    userStreakForDay(date).then((res) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setToday(date.getTime() === today.getTime());
      setStreak(res);
    });
  }, [date]);

  return (
    <>
      <div
        className={`streak-day ${today ? "yellow-streak" : ""}  ${
          streak ? "blue-streak" : ""
        } 
        ${isLoading ? " skeleton-loading " : ""} 
        `}
      >
        <p className={`${today ? "text-bold" : ""} streak-day-text`}>{day}</p>
      </div>
    </>
  );
}

export default StreakDay;

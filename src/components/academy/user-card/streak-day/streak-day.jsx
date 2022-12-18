import React from "react";
import "./streak-day.css";

function StreakDay({ today, day, streak }) {
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

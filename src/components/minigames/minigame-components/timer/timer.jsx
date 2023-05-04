import React, { useState, useEffect } from "react";

function Timer({ initialTime, onFinish, isPaused }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      if (!isPaused) setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onFinish, isPaused]);

  return <div className="timer">{timeLeft} seconds left</div>;
}

export default Timer;

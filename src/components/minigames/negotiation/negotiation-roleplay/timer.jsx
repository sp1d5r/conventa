import React, { useState, useEffect } from "react";

function Timer({ initialTime, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onFinish]);

  return <div className="timer">{timeLeft} seconds left</div>;
}

export default Timer;

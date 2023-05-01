import React, { useState, useEffect } from "react";
import Timer from "./timer";
import NegotiationSlider from "./negotiation-slider";

function NegotiationRoleplayGame({ setGameState, time }) {
  const [step, setStep] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const concessionPoints = [
    {
      title: "Lease Length (3-5 years)",
      min: 3,
      max: 5,
      step: 1,
    },
    {
      title: "Rent per square foot ($20-$30)",
      min: 20,
      max: 30,
      step: 1,
    },
    {
      title: "Security Deposit (1-3 months)",
      min: 1,
      max: 3,
      step: 1,
    },
    {
      title: "Rent-free period (0-3 months)",
      min: 0,
      max: 3,
      step: 1,
    },
    {
      title: "Parking Spaces (5-15 spots)",
      min: 5,
      max: 15,
      step: 1,
    },
  ];

  useEffect(() => {
    if (step > 0 && step <= concessionPoints.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, time * 1000);

      return () => clearTimeout(timer);
    }
  }, [time, step, concessionPoints.length]);

  const handleExit = () => {
    setGameState(0);
  };

  const nextConcession = () => {
    setStep(step + 1);
  };

  return (
    <div className="negotiation-roleplay-minigame">
      {step === 0 ? (
        <div>
          <h1>Concession Ladder - The Office Lease Negotiation</h1>
          <p>
            You are representing a growing company that is looking to lease
            office space. You are negotiating with a property manager who is
            trying to maximize rental income. You have five points of contention
            to address during the negotiation: lease length, rent per square
            foot, security deposit, rent-free period, and parking spaces.
          </p>
          <button onClick={nextConcession}>Start</button>
        </div>
      ) : step <= concessionPoints.length ? (
        <div>
          <h2>{concessionPoints[step - 1].title}</h2>
          <NegotiationSlider
            min={concessionPoints[step - 1].min}
            max={concessionPoints[step - 1].max}
            step={concessionPoints[step - 1].step}
            value={sliderValue}
            onChange={setSliderValue}
          />
          <div className="timer-container">
            <Timer initialTime={time} onFinish={nextConcession} />
          </div>
          <button onClick={nextConcession}>Next Concession</button>
        </div>
      ) : (
        <div>
          <h1>Finished!</h1>
          <button onClick={handleExit}>Exit</button>
        </div>
      )}
    </div>
  );
}

export default NegotiationRoleplayGame;

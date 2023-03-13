import React, { useEffect, useState } from "react";
import GreyHeart from "../../../../assets/lesson/grey-heart.svg";
import RedHeart from "../../../../assets/lesson/red-heart.svg";
import { getLives } from "../../../../cloud-infrastructure/firebase/firebase";
import "./lives.css";
import { useNavigate } from "react-router-dom";

function Lives({ lifeLost = false, redirect = false }) {
  const [livesLost, setLivesLost] = useState(3);
  const navigate = useNavigate();
  // const [infiniteLives, setInfiniteLives] = useState(false);

  useEffect(() => {
    // get lives lost
    getLives().then((res) => {
      console.log("result", res);
      setLivesLost(res);
      if (redirect && res >= 3) {
        navigate("/content-locked?reason=lives");
      }
    });
  }, [lifeLost, redirect, navigate]);

  const generateHearts = () => {
    const hearts = [];
    for (let grey = 0; grey < Math.min(livesLost, 3); grey++) {
      hearts.push(GreyHeart);
    }
    for (let red = 0; red < 3 - livesLost; red++) {
      hearts.push(RedHeart);
    }
    return hearts.map((heart) => {
      return <img src={heart} alt={"life "} />;
    });
  };

  return (
    <div className={"user-lives"}>
      {/* User Hearts */}
      {generateHearts()}
    </div>
  );
}

export default Lives;

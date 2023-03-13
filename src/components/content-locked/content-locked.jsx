import React, { useEffect, useState } from "react";
import "./content-locked.css";
import { change_color } from "../../cloud-infrastructure/utils/color";
import { useSearchParams } from "react-router-dom";
import LockMobile from "../../assets/content-locked/LockMobile.svg";
import Background1 from "../../assets/content-locked/content-locked-bg1.png";
import Background2 from "../../assets/content-locked/content-locked-bg2.png";
import Background3 from "../../assets/content-locked/content-locked-bg3.png";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import { Button } from "react-bootstrap";

function CountDown() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      const date = new Date();
      var tomorrowDate = new Date();
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      tomorrowDate.setHours(0, 0, 0, 0);
      const current_number = date.getTime();
      const tomorrow_number = tomorrowDate.getTime();
      const diffMs = tomorrow_number - current_number;
      const diff = new Date(diffMs);
      setHours(diff.getHours());
      setMinutes(diff.getMinutes());
      setSeconds(diff.getSeconds());
      console.log("here");
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <span className={"stopwatch-font"}>
      {hours}:{minutes}:{seconds}
    </span>
  );
}

function ContentLocked() {
  const search_params = useSearchParams()[0];
  const no_lives_remaining = search_params.get("reason") === "lives";

  useEffect(() => {
    change_color("#FFD2FD");
  }, []);

  const getElement = () => {
    if (window.innerWidth < 500) {
      return (
        <div className={"content-locked-mobile-div"}>
          <div className={"countdown-div"}>
            {no_lives_remaining ? (
              <>
                <CountDown />
                <p>left until content is unlocked</p>
              </>
            ) : (
              <>
                <span className={"stopwatch-font"}>Content Locked</span>
                <p>This content is not available on your plan :(</p>
              </>
            )}
          </div>
          <img className={"lock-image"} alt={"Locked"} src={LockMobile} />
          <Button className={"content-locked-button"}>Upgrade Plan</Button>
        </div>
      );
    } else {
      return (
        <>
          <div className={"content-locked-desktop-div"}>
            <div className={"countdown-div"}>
              {no_lives_remaining ? (
                <>
                  <CountDown />
                  <p>left until content is unlocked</p>
                </>
              ) : (
                <>
                  <span className={"stopwatch-font"}>Content Locked</span>
                  <p>This content is not available on your plan :(</p>
                </>
              )}
            </div>
            <img className={"lock-image"} alt={"Locked"} src={LockMobile} />
            <Button className={"content-locked-button"}>Upgrade Plan</Button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <MouseParallaxContainer
        globalFactorX={0.1}
        globalFactorY={0.1}
        className={"content-locked-full-div"}
      >
        {window.innerWidth < 500 ? (
          <></>
        ) : (
          <div className={"content-locked-title-div"}>
            <p>Content Locked</p>
          </div>
        )}
        <MouseParallaxChild factorX={0.16} factorY={0.2}>
          <img
            alt={"Background 1"}
            src={Background1}
            className={"content-background-image"}
          />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.28} factorY={0.32}>
          <img
            alt={"Background 2"}
            src={Background2}
            className={"content-background-image"}
          />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.4} factorY={0.4}>
          <img
            alt={"Background 3"}
            src={Background3}
            className={"content-background-image"}
          />
        </MouseParallaxChild>
        <div className={"content-body-div"}>{getElement()}</div>
      </MouseParallaxContainer>
    </>
  );
}

export default ContentLocked;

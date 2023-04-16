import React, { useEffect, useState } from "react";
import "./content-locked.css";
import { change_color } from "../../cloud-infrastructure/utils/color";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigator = useNavigate();

  useEffect(() => {
    change_color("#FFD2FD");
  }, []);

  const buttonPress = () => {
    navigator("/pricing-page");
  };

  const getElement = () => {
    return (
      <div className={"content-locked-mobile-div"}>
        <div className={"countdown-div"}>
          {no_lives_remaining ? (
            <>
              <CountDown />
              <p>left until content is unlocked</p>
              <Button
                className={"content-locked-button"}
                onClick={() => {
                  buttonPress();
                }}
              >
                Upgrade Plan
              </Button>
            </>
          ) : (
            <>
              <span className={"stopwatch-font"}>Content Locked</span>
              <p>This content is not available on your plan :(</p>
              <Button
                className={"content-locked-button"}
                onClick={() => {
                  buttonPress();
                }}
              >
                Upgrade Plan
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={"content-locked-full-div"}>
        <div className={"content-body-div"}>{getElement()}</div>
      </div>
    </>
  );
}

export default ContentLocked;

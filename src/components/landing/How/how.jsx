import React from "react";
import "./how.css";

function How() {
  return (
    <div className={"how-main-div"}>
      <div className={"how-top-div"}>
        <div className={"how-top-part"}>
          <span>
            HOW TO GET <span className={"how-span-green-text"}>STARTED</span>?
          </span>
        </div>
        <div className={"how-bottom-div"}>
          <div className={"how-bottom-left"}>
            <img
              src={require("../../../assets/Illustrations/how1.png")}
              alt={"How to get started with the program?"}
              className={"how-image-left"}
            />
          </div>
          <div className={"how-bottom-right"}>
            <div className={"how-bottom-top"}>
              <p className={"how-main-text-body"}>
                Getting started is easy! Just sign up for a free account and
                start reading some courses. Then, have a go at the mini game.
                But that's never enough. You'll also need to consistently
                complete the courses regularly.
              </p>
            </div>
            <div className={"how-bottom-bottom"}>
              <p className={"how-main-text-body"}>
                To make the most out of the resources available, we recommend
                downloading the app (coming soon). This will give you regular
                notifications to play 5 min mini games and keep your skills up
                to date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default How;

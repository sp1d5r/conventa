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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className={"how-bottom-bottom"}>
              <p className={"how-main-text-body"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default How;

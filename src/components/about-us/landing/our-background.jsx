import React from "react";
import WhyImage from "../../../assets/Illustrations/Why.png";

function OurBackground() {
  return (
    <div className={""}>
      <div className={""}>
        <div className={"why-top-part"}>
          <span>
            the <span className={"why-span-green-text"}>history </span> of
            convento
          </span>
        </div>
        <div className={"why-main-part"}>
          <div className={"why-main-left"}>
            <div className={"why-main-text-box"}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt
              </p>
            </div>
            <div className={"why-main-text-box"}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt
              </p>
            </div>
          </div>
          <figure className={"why-main-right"}>
            <img
              src={WhyImage}
              alt={"Why should you join the program?"}
              className={"why-img"}
            />
            <figcaption>All it takes is a little hard work!</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default OurBackground;

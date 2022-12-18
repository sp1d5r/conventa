import React from "react";
import "./about-us.css";
import AboutUsLanding from "../../assets/about-us/LandingAboutUs.svg";
import AboutUsLandingMobile from "../../assets/about-us/AboutUsLandingMobile.svg";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>
      <img
        className={"about-us-landing"}
        src={window.innerWidth < 700 ? AboutUsLandingMobile : AboutUsLanding}
        alt={"About us?"}
      />
      <div className={"container"}>
        <div className={"about-us-get-started"}>
          <Link to={"/auth"} className={"intro-button"}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

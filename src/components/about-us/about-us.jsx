import React from "react";
import "./about-us.css";
import AboutUsLanding from "../../assets/about-us/LandingAboutUs.svg";
import AboutUsLandingMobile from "../../assets/about-us/AboutUsLandingMobile.svg";
import { Link } from "react-router-dom";
import auth from "../../cloud-infrastructure/firebase/firebase";
import HistoryAboutUs from "./history/history";
import Strengths from "./strengths/strengths";
import Roadmap from "./roadmap/roadmap";

function AboutUs() {
  const current_user = auth.currentUser;
  return (
    <div>
      <img
        className={"about-us-landing"}
        src={window.innerWidth < 700 ? AboutUsLandingMobile : AboutUsLanding}
        alt={"About us?"}
      />
      <div className={"container"}>
        <div className={"about-us-get-started"}>
          <Link
            to={current_user ? "/academy" : "/auth"}
            className={"intro-button"}
          >
            <p>Get Started</p>
          </Link>
        </div>
        <br />
        <div className={"bottom-metrics"}>
          <div className={"bottom-metric"}>
            <p className={"main-metric"}>100+</p>
            <p className={"side-metric"}>Research papers referenced</p>
          </div>

          <div className={"bottom-metric"}>
            <p className={"main-metric"}>150+</p>
            <p className={"side-metric"}>Hours of content available</p>
          </div>

          <div className={"bottom-metric"}>
            <p className={"main-metric"}>20</p>
            <p className={"side-metric"}>Written courses available</p>
          </div>

          <div className={"bottom-metric"}>
            <p className={"main-metric"}>5+</p>
            <p className={"side-metric"}>Interactive Minigames</p>
          </div>
        </div>
        <br />
        <HistoryAboutUs />
        <Strengths />
        <Roadmap />
      </div>
    </div>
  );
}

export default AboutUs;

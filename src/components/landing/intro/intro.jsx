import React from "react";
import HomeLanding from "../../../assets/home/cast-study.svg";
import "./intro.css";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <>
      <div className={"intro-div"}>
        <div className={"intro-text"}>
          <h1 className={"intro-text-h1"}>
            <span>Use Technology to Interactively Grow</span>
            <span className={"green-text"}> Your Career</span>
            <span>!</span>
          </h1>

          <p className={"intro-text-p"}>
            Dive into a world where business meets psychology - from mastering
            negotiation tactics for your next salary discussion, to leveraging
            psychological principles to drive business growth!
          </p>
          <p className={"intro-text-p"}>
            Forget about old-school textbooks - this is learning made fun and
            interactive!
          </p>

          <Link to={"/auth"} className={"intro-button"}>
            <p>Get Started</p>
          </Link>
        </div>

        <div className={"intro-image"}>
          <img src={HomeLanding} alt={"something"} />
        </div>
      </div>
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
      <div className={"spacer border-bottom"} />
    </>
  );
}

export default Intro;

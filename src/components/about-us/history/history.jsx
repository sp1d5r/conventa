import React from "react";
import "./history.css";
import History from "../../../assets/about-us/history-conventa.svg";

function HistoryAboutUs() {
  return (
    <>
      <div className={"history-about-us-div"}>
        <div className={"left-hand-text"}>
          <h1 className={"intro-text-h1"}>
            <span>The History of </span>
            <span className={"green-text"}> Conventa</span>
          </h1>
          <p className={"intro-text-p text-left"}>
            Conventa started as a platform to teach people who struggled with
            social interaction how to understand nuances in body language.
          </p>
          <p className={"intro-text-p text-left"}>
            Since then we’ve expanded teaching our users how to use
            psychological methods to improve every aspect of their lives.
          </p>
        </div>
        <div className={"right-hand-image"}>
          <img src={History} alt={"History of Conventa"} />
        </div>
      </div>
      <br />
      <p className={"about-us-quote"}>
        “Written by experts using up-to-date research, offering a complete
        education in psychology”
      </p>
      <p className={"about-us-quote"}>Elijah Ahmad</p>
      <div className={"spacer border-bottom"} />
    </>
  );
}

export default HistoryAboutUs;

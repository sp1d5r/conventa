import React from "react";
import "./competence.css";
import FlowerGirl from "../../../assets/home/flower-girl.svg";

function Competence() {
  return (
    <>
      <div className={"spacer"} />
      <div className={"competence"}>
        <h1 className={"intro-text-h1 competence-text"}>
          <span>Empower Your </span>
          <span className={"green-text"}> Career</span>
          <span> at Any Stage with Us!</span>
        </h1>
        <p className={"intro-text-p competence-text-p"}>
          Learn more about us in our{" "}
          <a className={"color-blue"} href={"/about-us"}>
            about us
          </a>{" "}
          section
        </p>
      </div>
      <div className={"competence-main-div"}>
        <div className={"competence-left-image"}>
          <img src={FlowerGirl} alt={"Flower Girl"} />
        </div>
        <div className={"competence-attributes"}>
          <div className={"competence-attribute bottom-outline"}>
            <p className={"attribute-heading"}>Relationship Savvy</p>
            <p className={"attribute-bottom"}>
              Discover how to communicate emotions effectively and foster
              empathy, transforming your professional relationships.
            </p>
          </div>
          <div className={"competence-attribute bottom-outline"}>
            <p className={"attribute-heading"}>Business Mastery</p>
            <p className={"attribute-bottom"}>
              Unlock the secrets to workplace excellence, mastering everything
              from impactful communication to persuasive selling and
              negotiation.
            </p>
          </div>
          <div className={"competence-attribute"}>
            <p className={"attribute-heading"}>Personal Development</p>
            <p className={"attribute-bottom"}>
              Harness the power of psychology to boost performance - from
              sharpening your memory to understanding the subtle art of
              influence.
            </p>
          </div>
        </div>
      </div>
      <div className={"spacer border-bottom"} />
    </>
  );
}

export default Competence;

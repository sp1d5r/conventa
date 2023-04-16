import React from "react";
import "./competence.css";
import FlowerGirl from "../../../assets/home/flower-girl.svg";

function Competence() {
  return (
    <>
      <div className={"spacer"} />
      <div className={"competence"}>
        <h1 className={"intro-text-h1 competence-text"}>
          <span>Making you</span>
          <span className={"green-text"}> more competent</span>
          <span> at all ages!</span>
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
            <p className={"attribute-heading"}>Relationship Skills</p>
            <p className={"attribute-bottom"}>
              Learn how to express emotions more effectively and become more
              compassionate.
            </p>
          </div>
          <div className={"competence-attribute bottom-outline"}>
            <p className={"attribute-heading"}>Business Skills</p>
            <p className={"attribute-bottom"}>
              Learn how to become more proficient at work, through speaking,
              selling and negotiating.
            </p>
          </div>
          <div className={"competence-attribute"}>
            <p className={"attribute-heading"}>Personal Development</p>
            <p className={"attribute-bottom"}>
              Use psychological methods to improve performance at sports,
              memorization and manipulation.
            </p>
          </div>
        </div>
      </div>
      <div className={"spacer border-bottom"} />
    </>
  );
}

export default Competence;

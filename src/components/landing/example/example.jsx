import React from "react";
import "./example.css";
import { Link } from "react-router-dom";
import Child from "../../../assets/home/person-pregnant-solid.svg";
import Tie from "../../../assets/home/user-tie-solid.svg";
import Check from "../../../assets/home/check-solid.svg";
import Love from "../../../assets/home/heart-solid.svg";
import Baseball from "../../../assets/home/baseball-solid.svg";
import Scale from "../../../assets/home/scale-balanced-solid.svg";
import Sleep from "../../../assets/home/bed-solid.svg";
import ExampleImage from "../../../assets/home/Example.svg";

function Example() {
  return (
    <>
      <div className={"spacer"} />
      <h1 className={"intro-text-h1"}>
        See the world the way it was supposed to be seen!
      </h1>
      <div className={"example-courses-div"}>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Child}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Child Psychology</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img className={"example-image"} src={Tie} alt={"child psychology"} />
          <p className={"example-course-text"}>Manipulation 101</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Check}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Deception Detection</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Love}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Expressing Emotion</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Baseball}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Sport Psychology</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Scale}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Negotiations 101</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <img
            className={"example-image"}
            src={Sleep}
            alt={"child psychology"}
          />
          <p className={"example-course-text"}>Intro to Hypnosis</p>
        </Link>
        <Link className={"example-course-div"} to={"/auth"}>
          <p className={"example-course-text flex-center"}>
            and so much more...
          </p>
        </Link>
      </div>
      <img
        className={"example-course-image"}
        src={ExampleImage}
        alt={"Example of our course"}
      />
    </>
  );
}

export default Example;

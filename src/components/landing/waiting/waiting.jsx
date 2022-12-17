import React from "react";
import "./waiting.css";
import { Link } from "react-router-dom";

function Waiting() {
  return (
    <>
      <div className={"waiting-div"}>
        <div className={"waiting-text"}>
          <h1 className={"green-text"}>What are you waiting for?</h1>
          <p className={"intro-text-p"}>
            Take control back of your life now with conventa
          </p>
        </div>
        <div className={"waiting-text"}>
          <Link to={"/auth"} className={"intro-button"}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
      <div className={"spacer"} />
      <br />
    </>
  );
}

export default Waiting;

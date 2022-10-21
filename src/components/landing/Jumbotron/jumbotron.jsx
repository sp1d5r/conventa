import "./jumbotron.css";
import React, { useState } from "react";
import Windows from "../../../assets/Icons/Windows XP.png";
import Apple from "../../../assets/Icons/Apple Logo.png";
import Google from "../../../assets/Icons/Google.png";

function Jumbotron() {
  const [mouse, setMouse] = useState(false);

  return (
    <div className={"jumbo-wrapper"}>
      <div className={`jumbo-main${mouse ? "-gif" : ""}`}>
        <span className={"jumbo-text-black"}>
          SEE WHAT EVERY
          <span className={"jumbo-text-white"}> BODY </span>
          IS TELLING YOU
        </span>
        <p className={"jumbo-sub-text"}>
          Trusted by experts in the field, backed by research conducted by the
          FBI and proven to work in the real world.
        </p>
        <button
          className={"jumbo-get-started"}
          onMouseEnter={() => {
            setMouse(true);
          }}
          onMouseLeave={() => {
            setMouse(false);
          }}
        >
          Get Started Now!
        </button>
      </div>
      <div className={"jumbo-bottom"}>
        <div className={"jumbo-small-wrapper"}>
          <p className={"jumbo-small-text"}>available on:</p>
          <img className={"jumbo-small-image"} src={Windows} alt={"Windows"} />
          <img className={"jumbo-small-image"} src={Apple} alt={"Windows"} />
          <img className={"jumbo-small-image"} src={Google} alt={"Windows"} />
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;

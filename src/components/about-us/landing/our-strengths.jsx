import React from "react";
import "../about-us.css";

function OurStrength() {
  return (
    <div className={""}>
      <div className={""}>
        <div className={"why-top-part"}>
          <span>
            our <span className={"why-span-green-text"}>strengths </span>
          </span>
        </div>
        <div className={"why-main-part"}>
          {/* Here we want a 3x3 grid and in the center we need it to say Convento*/}
          <div className={"our-strength-grid"}>
            <div className={"div-box"}>Software Engineers</div>
            <div className={"div-box"}>Empaths</div>
            <div className={"div-box"}>High Functioners</div>
            <div className={"div-box"}>Crazy</div>
            <div className={"div-box-main"}>Convento</div>
            <div className={"div-box"}>Stoners</div>
            <div className={"div-box"}>Hippies</div>
            <div className={"div-box"}>Lovers</div>
            <div className={"div-box"}>Fighters</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStrength;

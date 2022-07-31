import React from "react";

function OurStrength() {
  return (
    <div className={""}>
      <div className={""}>
        <div className={"why-top-part"}>
          <span>
            Our <span className={"why-span-green-text"}>Strengths </span> of
            body language
          </span>
        </div>
        <div className={"why-main-part"}>
          {/* Here we want a 3x3 grid and in the center we need it to say Convento*/}
          <div className={"our-strength-grid"}>
            <div>Text 1</div>
            <div>Text 2</div>
            <div>Text 3</div>
            <div>Text 4</div>
            <div>Convento</div>
            <div>Text 6</div>
            <div>Text 7</div>
            <div>Text 8</div>
            <div>Text 9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStrength;

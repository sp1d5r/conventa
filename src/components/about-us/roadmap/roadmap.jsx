import React from "react";
import "./roadmap.css";

function Roadmap() {
  return (
    <>
      <div className={"strengths-div"}>
        <h1 className={"intro-text-h1"}>The Roadmap</h1>
        <p className={"intro-text-p text-left"}>
          With our official launch on March 2023 we have a lot of work be to
          cracking on with!
        </p>
        <br />
        <br />
        <div className={"cost-cards"}>
          <div className={"cost-card"}>
            <div className={"cost-card-heading"}>
              <p className={"cost-card-price"}>23'</p>
              <p className={"card-description"}>Written content + Minigames</p>
            </div>
            <div className={"cost-card-section"}>
              <p className={"cost-card-text"}>
                our team has been working hard building the worlds best
                psychology content, and by 2023 we should have an initial
                catalogue detailing practical methods for psychology.
              </p>
            </div>
          </div>

          <div className={"cost-card"}>
            <div className={"cost-card-heading"}>
              <p className={"cost-card-price"}>24'</p>
              <p className={"card-description"}>Case Studies</p>
            </div>
            <div className={"cost-card-section"}>
              <p className={"cost-card-text"}>
                After the written content and minigames have been completed the
                focus will shift to real life examples of case studies looking
                at influential people like Elon Musk and Steve Jobs as well as
                some scary criminals...
              </p>
            </div>
          </div>

          <div className={"cost-card"}>
            <div className={"cost-card-heading"}>
              <p className={"cost-card-price"}>25'</p>
              <p className={"card-description"}>
                Zoom/In Person Psychology Lessons
              </p>
            </div>
            <div className={"cost-card-section"}>
              <p className={"cost-card-text"}>
                our team has been working hard building the worlds best
                psychology content, and by 2023 we should have an initial
                catalogue detailing practical methods for psychology.
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className={"spacer border-bottom"} />
      </div>
    </>
  );
}

export default Roadmap;

import "./why.css";
import React from "react";
import WhyImage from "../../../assets/Illustrations/Why.png";

function Why() {
  return (
    <div className={"why-background"}>
      <div className={"why-background-unskewed"}>
        <div className={"why-top-part"}>
          <span>
            WHY DO YOU <span className={"why-span-green-text"}>CARE</span>?
          </span>
        </div>
        <div className={"why-main-part"}>
          <div className={"why-main-left"}>
            <div className={"why-main-text-box"}>
              <p>
                Have you ever had someone <b>betray</b> you, <b>cheat</b> on
                you, or <b>lie</b> to you? The first question you ask yourself
                is usually, <b>"Why didn't I know?" </b>
                The answer is simple: because{" "}
                <b>nonverbal communication makes up 80%</b> of all human
                communication, and you weren't reading their body language
                correctly. After the event you probably realised all the signs
                were there, so why didn't you notice?
                <b> It's not your fault, and we're here to help!</b>
              </p>
              <p>
                Still not interest? Body language is a proven way to{" "}
                <b>relax</b> and <b>de-stress</b> yourself. It can also help you
                understand people better, and help you <b>find a partner</b> or{" "}
                <b>progress in your career</b>. In a world where we are
                constantly surrounded by people, learning to read and understand
                body language can make you <b>feel less lonely</b>.
              </p>
            </div>
          </div>
          <figure className={"why-main-right"}>
            <img
              src={WhyImage}
              alt={"Why should you join the program?"}
              className={"why-img"}
            />
            <figcaption>All it takes is a little hard work!</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Why;

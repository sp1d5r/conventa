import React, { useEffect } from "react";
import "./effective-speaking.css";
import { change_color } from "../../../cloud-infrastructure/utils/color";

function EffectiveSpeaking() {
  useEffect(() => {
    change_color("#b8b7ff");
  }, []);

  return (
    <>
      <div className={"effective-speaking-main-div"}></div>
    </>
  );
}

export default EffectiveSpeaking;

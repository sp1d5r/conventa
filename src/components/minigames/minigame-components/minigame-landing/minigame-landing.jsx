import React, { useEffect } from "react";
import "../shared.css";
import { change_color } from "../../../../cloud-infrastructure/utils/color";

function MinigameLanding({ color, children }) {
  useEffect(() => {
    change_color(color);
  }, [color]);

  return (
    <div className={"white-background"}>
      <div
        className={"minigame-landing-main-div"}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
}

export default MinigameLanding;

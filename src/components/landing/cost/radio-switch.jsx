import React, { useState } from "react";
import "./cost.css";
import Switch from "../../../assets/home/switch.svg";

function RadioSwitch({ switchMonthly }) {
  const [isMonthly, setMonthly] = useState(true);

  const switch_time = () => {
    switchMonthly();
    setMonthly(!isMonthly);
  };

  if (isMonthly) {
    return (
      <>
        <div
          className={"outer-switch"}
          onClick={() => {
            switch_time();
          }}
        >
          <div className={"inner-switch"}>
            <p className={"radio-switch-p"}>Monthly</p>
          </div>
          <img className={"switch-icon"} src={Switch} alt={"||"} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={"outer-switch"}
          onClick={() => {
            switch_time();
          }}
        >
          <img className={"switch-icon"} src={Switch} alt={"||"} />
          <div className={"inner-switch"}>
            <p className={"radio-switch-p"}>Annually</p>
          </div>
        </div>
      </>
    );
  }
}

export default RadioSwitch;

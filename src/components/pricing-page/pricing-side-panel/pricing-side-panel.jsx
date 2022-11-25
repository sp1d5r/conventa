import React from "react";
import "./pricing-side-panel.css";
import { ReactComponent as PricingPageImage } from "../../../assets/pricing-page/Group 19.svg";

function PricingSidePanel() {
  return (
    <div className={"pricing-side-panel"}>
      <div className={"pricing-side-card"}>
        <div className={"side-panel-text"}>
          <p className={"side-panel-title"}>Learn psychology</p>
          <p className={"side-panel-subtext"}>Improve your life now!</p>
        </div>
        <PricingPageImage className={"side-panel-image"} />
      </div>
    </div>
  );
}

export default PricingSidePanel;

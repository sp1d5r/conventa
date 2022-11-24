import React from "react";
import "./pricing-select-card.css";
import "../property/property";
import Property from "../property/property";

function PricingSelectCard({ plan_selected, setPlan, title, price, level }) {
  return (
    <>
      <div className={"plan-selected-card"}>
        <div className={"plan-selected-value"}>
          <p className={"plan-selected-title"}>Selected</p>
        </div>
        <div className={"plan-selected-bottom-div"}>
          <p className={"plan-selected-title"}>{title}</p>
          <p className={"plan-selected-price"}>£{price}</p>
          <Property valid={level === 1} text={"Full Course Access"} />
          <Property valid={level === 2} text={"Full Minigame Access"} />
          <Property valid={level === 3} text={"Beta Testing Case Studies"} />
        </div>
      </div>
    </>
  );
}

export default PricingSelectCard;

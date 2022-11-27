import React from "react";
import "./pricing-select-card.css";
import "../property/property";
import Property from "../property/property";

function PricingSelectCard({
  plan_selected,
  setPlan,
  title,
  price,
  level,
  selected,
}) {
  const toSelected = (original) => {
    if (selected) {
      return original.replace("select", "selected");
    } else {
      return original;
    }
  };

  return (
    <>
      <div
        className={toSelected("plan-select-card")}
        onClick={() => {
          setPlan(level);
        }}
      >
        <div className={toSelected("plan-select-value")}>
          <p className={toSelected("plan-select-title")}>Selected</p>
        </div>
        <div className={toSelected("plan-select-bottom-div")}>
          <div className={toSelected("plan-select-text")}>
            <p className={toSelected("plan-select-class")}>{title}</p>
            <p className={toSelected("plan-select-price")}>£{price}</p>
          </div>
          <div className={"properties-div"}>
            <Property
              valid={level >= 1}
              property_name={"Full Course Access"}
              selected={selected}
            />
            <Property
              valid={level >= 2}
              property_name={"Full Minigame Access"}
              selected={selected}
            />
            <Property
              valid={level >= 3}
              property_name={"Beta Testing Case Studies"}
              selected={selected}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingSelectCard;

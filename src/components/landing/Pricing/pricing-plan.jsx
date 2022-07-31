import React from "react";
import "./pricing-plan.css";
import BlueButton from "../../button/blue-button";

function PricingPlan() {
  return (
    <div className={"pricing-main"}>
      <div className={"pricing-top"}>
        <span>PRICING PLANS</span>
        <p className={"pricing-subtext"}>
          We hate it when the pricing plans of a service are not transparent, so
          here is exactly what you are getting!
        </p>
      </div>
      <div className={"pricing-bottom"}>
        <div className={"pricing-card"}>
          <p className={"subscription-type"}>Hobbyist</p>
          <p className={"subscription-cost"}>Free</p>
          <div className={"subscription-benefits"}>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Access to 1 full course</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Access to 1 minigame</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Access to the first lesson of all courses</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/null.png")}
                alt={"price includes"}
              />
              <p>Full access to all the courses</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/null.png")}
                alt={"price includes"}
              />
              <p>Full access to all the minigames</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/null.png")}
                alt={"price includes"}
              />
              <p>Full acccess to the manual</p>
            </div>
          </div>
          <BlueButton text={"Sign Up"} />
        </div>
        <div className={"pricing-card"}>
          <p className={"subscription-type"}>Amateur</p>
          <span className={"subscription-cost"}>
            £5.99 <span className={"per-month"}>per month</span>
          </span>
          <div className={"subscription-benefits"}>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to all of the courses</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to all of the minigames</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to the manuel</p>
            </div>
          </div>
          <BlueButton text={"Sign Up"} />
        </div>
        <div className={"pricing-card"}>
          <p className={"subscription-type"}>Professional</p>
          <span className={"subscription-cost"}>
            £9.99 <span className={"per-month"}>per month</span>
          </span>
          <div className={"subscription-benefits"}>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to all of the courses</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to all of the minigames</p>
            </div>
            <div className={"single-benefit"}>
              <img
                className={"benefit-icon"}
                src={require("../../../assets/Icons/check.png")}
                alt={"price includes"}
              />
              <p>Full access to the manuel</p>
            </div>
          </div>
          <BlueButton text={"Sign Up"} />
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;

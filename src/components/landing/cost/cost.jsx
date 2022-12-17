import React, { useState } from "react";
import "./cost.css";
import RadioSwitch from "./radio-switch";
import { Link } from "react-router-dom";

function Cost() {
  const [monthly, setMonthly] = useState(true);
  const switchMonthly = () => {
    setMonthly(!monthly);
  };
  return (
    <>
      <div className={"spacer"} />
      <div className={"cost-heading"}>
        <h1>
          Affordable for <span className={"green-text"}>Everyone</span>!
        </h1>
        <RadioSwitch switchMonthly={switchMonthly} />
      </div>
      <span className={"cost-main-text"}>
        A lot of our courses are free - and if you have special circumstances
        email us at
      </span>
      <div></div>
      <a
        className={"cost-main-text cost-main-link"}
        href={"mailto: support@conventa.net"}
      >
        {" "}
        support@conventa.net
      </a>
      <div className={"spacer"} />
      <div className={"cost-cards"}>
        <div className={"cost-card"}>
          <div className={"cost-card-heading"}>
            <p className={"cost-card-price"}>{monthly ? "£3" : "£15"}</p>
            <p className={"cost-card-monthly"}>
              {monthly ? "per month" : "per year"}
            </p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Access to all written articles</p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Access to all written courses</p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>
              Preview some interactive minigames
            </p>
          </div>
        </div>
        <div className={"cost-card"}>
          <div className={"cost-card-heading"}>
            <p className={"cost-card-price"}>{monthly ? "£5" : "£30"}</p>
            <p className={"cost-card-monthly"}>
              {monthly ? "per month" : "per year"}
            </p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Access to all written articles</p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>
              Access to all interactive minigames
            </p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Preview some beta case studies</p>
          </div>
        </div>
        <div className={"cost-card"}>
          <div className={"cost-card-heading"}>
            <p className={"cost-card-price"}>{monthly ? "£15" : "£100"}</p>
            <p className={"cost-card-monthly"}>
              {monthly ? "per month" : "per year"}
            </p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Access to all written articles</p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>
              Access to all interactive minigames
            </p>
          </div>
          <div className={"cost-card-section"}>
            <p className={"cost-card-text"}>Access to all beta case studies</p>
          </div>
        </div>
      </div>
      <div className={"cost-div"}>
        <Link to={"/auth"} className={"intro-button"}>
          <p>Get Started</p>
        </Link>
      </div>
      <div className={"spacer border-bottom"} />
    </>
  );
}

export default Cost;

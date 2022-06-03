import React, { useState } from "react";
import "./signup.css";
import GreenButton from "../../button/green-button";

function SignUp({ changeObjective }) {
  const [pricing, setPricing] = useState(0);

  return (
    <div className={"sign-in-home"}>
      <div className={"sign-in-top"}>
        <p>Sign Up</p>
      </div>
      <div className={"sign-in-bottom"}>
        <div className={"sign-in-left"}>
          <p className={"sign-in-main-text"}>Create an Account</p>
          <div className={"sign-in-forum"}>
            <p>Email Address</p>
            <input></input>
            <p>Password</p>
            <input></input>
            <p>Confirm Password</p>
            <input></input>
            <p>What are you using convento for?</p>
            <input></input>
            <p>Where did you hear about convento?</p>
            <input></input>
            <br />
            <br />
            <GreenButton text={"Sign Up!"} style={{ width: "20%" }} />
            <div className={"sign-in-button"}>
              <div className={"sign-in-bar"} />
              <p>Or Continue With</p>
              <div className={"sign-in-bar"} />
            </div>
            <div className={"sign-in-button"}>
              <div className={"alternative-sign-in"}>
                <img
                  className={"alternative-sign-in-image "}
                  src={require("../../../assets/Icons/Microsoft-Cloud.png")}
                  alt={"Login with Microsoft"}
                />
              </div>
              <div className={"alternative-sign-in"}>
                <img
                  className={"alternative-sign-in-image "}
                  src={require("../../../assets/Icons/Google-Cloud.png")}
                  alt={"Login with Google"}
                />
              </div>
              <div className={"alternative-sign-in"}>
                <img
                  className={"alternative-sign-in-image "}
                  src={require("../../../assets/Icons/Facebook-Cloud.png")}
                  alt={"Login with Facebook"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"sign-in-right"}>
          <div className={"sign-in-right-main"}>
            <img
              className={"sign-in-page-illustration"}
              src={require("../../../assets/Illustrations/signup.png")}
              alt={"Login illustration"}
            />
            <span className={"sign-in-span-switch"}>
              Or switch to{" "}
              <span
                className={"switch-text-bold"}
                onClick={() => changeObjective(true)}
              >
                Login
              </span>
            </span>

            <div className={"sign-in-forum"}>
              <p>Select Plan:</p>
              <div className={"pricing-options-sign-up"}>
                <div
                  className={
                    pricing === 0
                      ? "pricing-card-sign-up-selected"
                      : "pricing-card-sign-up"
                  }
                  onClick={() => setPricing(0)}
                >
                  <img
                    className={"pricing-sign-in-image "}
                    src={require("../../../assets/Illustrations/Free-pricing.png")}
                    alt={"Login with Facebook"}
                  />
                  <p className={"sign-up-pricing-type"}>Free</p>
                  <span>Free</span>
                </div>
                <div
                  className={
                    pricing === 1
                      ? "pricing-card-sign-up-selected"
                      : "pricing-card-sign-up"
                  }
                  onClick={() => setPricing(1)}
                >
                  <img
                    className={"pricing-sign-in-image "}
                    src={require("../../../assets/Illustrations/hobbiest-pricing.png")}
                    alt={"Login with Facebook"}
                  />
                  <p className={"sign-up-pricing-type"}>Hobbiest</p>
                  <span>
                    £5.99{" "}
                    <span className={"sign-up-pricing-per-month"}>
                      per month
                    </span>
                  </span>
                </div>
                <div
                  className={
                    pricing === 2
                      ? "pricing-card-sign-up-selected"
                      : "pricing-card-sign-up"
                  }
                  onClick={() => setPricing(2)}
                >
                  <img
                    className={"pricing-sign-in-image"}
                    src={require("../../../assets/Illustrations/professional-pricing.png")}
                    alt={"Login with Facebook"}
                  />
                  <p className={"sign-up-pricing-type"}>Professional</p>
                  <span>
                    £9.99{" "}
                    <span className={"sign-up-pricing-per-month"}>
                      per month
                    </span>
                  </span>
                </div>
              </div>
              {pricing !== 0 ? (
                <>
                  <p>Card Number</p>
                  <input></input>
                  <div className={"payment-details-split"}>
                    <p className={"payment-details-split-child"}>CSV</p>
                    <p> Expiration Date</p>
                  </div>
                  <div>
                    <input></input>
                    <input></input>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

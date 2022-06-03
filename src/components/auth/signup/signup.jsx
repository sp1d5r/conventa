import React from "react";
import "./signup.css";
import GreenButton from "../../button/green-button";

function SignUp({ changeObjective }) {
  return (
    <div className={"login-home"}>
      <div className={"login-top"}>
        <p>Sign Up</p>
      </div>
      <div className={"login-bottom"}>
        <div className={"login-left"}>
          <p className={"login-main-text"}>Create an Account</p>
          <div className={"login-forum"}>
            <p>Email Address</p>
            <input></input>
            <p>Password</p>
            <input></input>
            <br />
            <br />
            <GreenButton text={"Login"} style={{ width: "20%" }} />
            <div className={"login-button"}>
              <div className={"login-bar"} />
              <p>Or Continue With</p>
              <div className={"login-bar"} />
            </div>
            <div className={"login-button"}>
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
        <div className={"login-right"}>
          <div className={"login-right-main"}>
            <img
              className={"login-page-illustration"}
              src={require("../../../assets/Illustrations/login.png")}
              alt={"Login illustration"}
            />
            <span>
              Or switch to{" "}
              <span
                className={"switch-text-bold"}
                onClick={() => changeObjective(false)}
              >
                Sign Up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

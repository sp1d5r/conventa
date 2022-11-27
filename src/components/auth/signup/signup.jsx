import React, { useState } from "react";
import "../login/login.css";
import { createAccount } from "../../../cloud-infrastructure/firebase/firebase";

function SignUp({ changeObjective, initial, size }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const switch_to_sign_up = () => {
    changeObjective(true);
  };

  const verifyDetails = () => {
    return password === newPassword;
  };

  const failedCallback = (error_code, error_message) => {
    console.log(error_code, error_message);
  };

  const successfulCallback = () => {
    window.location.href = "/pricing-page";
  };

  const trySignIn = () => {
    if (verifyDetails()) {
      createAccount(email, password, name, successfulCallback, failedCallback);
    }
  };

  return (
    <div className={"login-home"}>
      <div className={"login-section"}>
        <div
          className={`login-body slide-in${initial.current ? "-right" : ""}`}
        >
          <div className={"login-body"}>
            <p className={"login-title"}>Create a New Account</p>
            {size ? (
              <span>
                if you already have an account, click{" "}
                <span
                  className={"underline"}
                  onClick={() => {
                    switch_to_sign_up();
                  }}
                >
                  here
                </span>
              </span>
            ) : (
              <></>
            )}

            <div className={"various-authentication"}>
              <img
                alt={"Sign in with Facebook"}
                src={require("../../../assets/Icons/Facebook Circled.png")}
                className={"alt-auth"}
              />
              <img
                alt={"Sign in with Facebook"}
                src={require("../../../assets/Icons/Google Plus.png")}
                className={"alt-auth"}
              />
              <img
                alt={"Sign in with Facebook"}
                src={require("../../../assets/Icons/LinkedIn.png")}
                className={"alt-auth"}
              />
            </div>

            <div className={"login-divider"}>
              <div />
              <p>or</p>
              <div />
            </div>

            <form className={"login-form"}>
              <p>email</p>
              <input
                className={"login-input"}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setEmail(e.target.value);
                  }
                }}
                placeholder={email}
              />
              <br />
              <p>name</p>
              <input
                className={"login-input"}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setName(e.target.value);
                  }
                }}
                placeholder={name}
              />
              <br />
              <p>password</p>
              <input
                className={"login-input"}
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <p>re-enter password</p>
              <input
                className={"login-input"}
                type={"password"}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </form>
            <br />

            <button
              className={"login-button"}
              onClick={() => {
                trySignIn();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {size ? (
        <></>
      ) : (
        <div className={`side-body ${initial.current ? "slide-in-right" : ""}`}>
          <div className={"side-section"}>
            <p className={"side-title"}>Have an Account?</p>
            <p className={"side-text-body"}>
              Sign up and we'll get back to work!
            </p>
            <button
              className={"side-button"}
              onClick={() => {
                switch_to_sign_up();
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;

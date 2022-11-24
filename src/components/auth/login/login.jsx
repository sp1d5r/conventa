import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

function Login({ changeObjective, initial, size }) {
  const switch_to_sign_up = () => {
    changeObjective(false);
  };

  console.log(initial.current);

  return (
    <div className={"login-home"}>
      <div className={"login-section"}>
        <div
          className={`login-body slide-in${initial.current ? "-right" : ""}`}
        >
          <p className={"login-title"}>Login to Your Account</p>
          {size ? (
            <span>
              if you're new sign up{" "}
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
            <input className={"login-input"} />
            <br />
            <p>password</p>
            <input className={"login-input"} />
          </form>
          <br />

          <Link to={"/academy"} className={"login-button"}>
            Sign In
          </Link>
        </div>
      </div>
      {size ? (
        <></>
      ) : (
        <div className={`side-body ${initial.current ? "slide-in-right" : ""}`}>
          <div className={"side-section"}>
            <p className={"side-title"}>New Here?</p>
            <p className={"side-text-body"}>
              Sign up and learn about dark psychology in a never before seen
              interactive way!
            </p>
            <button
              className={"side-button"}
              onClick={() => {
                switch_to_sign_up();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

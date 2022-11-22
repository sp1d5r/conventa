import React from "react";
import "./login.css";

function Login({ changeObjective }) {
  const size = window.innerWidth < 600;
  return (
    <div className={"login-home"}>
      <div className={"login-section slide-in"}>
        <div className={"login-body"}>
          <p className={"login-title"}>Login to Your Account</p>
          {size ? (
            <span>
              if you're new sign in <span className={"underline"}>here</span>
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

          <button className={"login-button"}>Sign In</button>
        </div>
      </div>
      {size ? (
        <></>
      ) : (
        <div className={"side-body"}>
          <div className={"side-section"}>
            <p className={"side-title"}>New Here?</p>
            <p className={"side-text-body"}>
              Sign up and learn about dark psychology in a never before seen
              interactive way!
            </p>
            <button className={"side-button"}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

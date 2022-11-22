import React from "react";
import "./login.css";

function Login({ changeObjective }) {
  return (
    <div className={"login-home"}>
      <div className={"login-body"}>
        <p className={"login-title"}>Login to Your Account</p>
        <div className={"various-authentication"}>
          <div className={"alt-auth"} />
          <div className={"alt-auth"} />
          <div className={"alt-auth"} />
        </div>

        <div className={"login-divider"}>
          <div />
          <p>or</p>
          <div />
        </div>

        <form className={"login-form"}>
          <p>email</p>
          <input className={"login-input"} />
          <p>password</p>
          <input className={"login-input"} />
        </form>

        <button className={"login-button"}>Sign In</button>
      </div>
    </div>
  );
}

export default Login;

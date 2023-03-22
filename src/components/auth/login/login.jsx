import React, { useState } from "react";
import { useAuth } from "../../../cloud-infrastructure/firebase/auth";
import "../login-signup.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GreenLogo from "../../../assets/Icons/Logo-Green.svg";
import LoginImages from "../images/images";

function Login({ changeObjective, initial, size }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Getting Sign In method from Auth Context
  const { signIn } = useAuth();

  const switch_to_sign_up = () => {
    changeObjective(false);
  };

  const failedCallback = (error_code, error_message) => {
    setError(`Failed to Login - ${error_message}`);
    console.log(error_code, error_message);
  };

  const successfulCallback = () => {
    navigate("/pricing-page");
  };

  const trySignIn = () => {
    signIn(email, password, successfulCallback, failedCallback);
  };

  return (
    <div className={"login-home"}>
      <div className={"login-section"}>
        <div className={"auth-form-main"}>
          <div className={"auth-title"}>
            <img src={GreenLogo} alt={"Conventa"} />
          </div>
          <p className={"auth-title"}>Login</p>
          <p className={"auth-sub-text"}>Brush up on some lessons!</p>
          <button className={"login-with-google-button"}>
            <img
              src={require("../../../assets/Icons/Google-Line.png")}
              alt={"G"}
            />
            Login with Google
          </button>

          {error !== "" ? (
            <Alert variant={"danger"} className={"danger-alert"}>
              {error}
            </Alert>
          ) : (
            <></>
          )}

          <div className={"auth-divider"}>
            <div />
            <p>Sign in with Email</p>
            <div />
          </div>

          <form className={"auth-form"}>
            <p className={"auth-form-title"}>Email</p>
            <input
              className={"auth-form-input"}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setEmail(e.target.value);
                }
              }}
            />
            <p className={"auth-form-title"}>Password</p>
            <input
              className={"auth-form-input"}
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>

          <div className={"bottom-text-div"}>
            <div className={"remember-me-checkbox"}>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <p>Remember Me</p>
            </div>
            <a className={"auth-link"} href={"/forgot-password"}>
              Forgot Password
            </a>
          </div>

          <button
            className={"auth-button"}
            onClick={(e) => {
              trySignIn();
            }}
          >
            <p className={"auth-button-text"}>Sign In</p>
          </button>
          <p className={"auth-text"}>
            Already have an account?{" "}
            <span
              className={"auth-link"}
              onClick={() => {
                switch_to_sign_up();
              }}
            >
              Create an Account
            </span>
          </p>
        </div>
      </div>
      {size ? (
        <></>
      ) : (
        <div className={`side-body ${initial.current ? "slide-in-right" : ""}`}>
          <LoginImages />
        </div>
      )}
    </div>
  );
}

export default Login;

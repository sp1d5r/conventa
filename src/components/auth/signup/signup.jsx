import React, { useState } from "react";
import { useAuth } from "../../../cloud-infrastructure/firebase/auth";
import "../login-signup.css";
import GreenLogo from "../../../assets/Icons/Logo-Green.svg";
import { Alert } from "react-bootstrap";
import LoginImages from "../images/images";
import { useNavigate } from "react-router-dom";

function SignIn({ changeObjective, initial, size }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Getting Sign In method from Auth Context
  const { createAccount, signInWithGoogle } = useAuth();

  const switch_to_sign_up = () => {
    changeObjective(true);
  };

  const verifyDetails = () => {
    return password === newPassword;
  };

  const failedCallback = (error_code, error_message) => {
    setError(`Failed to Sign Up - ${error_message}`);
    console.log(error_code, error_message);
  };

  const successfulCallback = () => {
    try {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          }
        })
        .catch((err) => {});
    } catch (err) {
      console.log("Unable to give notifications", err);
    } finally {
      navigate("/introduction");
    }
  };

  const successfulCallbackLogin = () => {
    console.log("Requesting permission...");
    try {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/pricing-page");
    }
  };

  const trySignIn = () => {
    if (verifyDetails()) {
      createAccount(email, password, name, successfulCallback, failedCallback);
    } else {
      setError("Passwords do not match!");
    }
  };

  return (
    <div className={"login-home"}>
      <div className={"login-section"}>
        <div className={"auth-form-main"}>
          <div className={"auth-title"}>
            <img src={GreenLogo} alt={"Conventa"} />
          </div>
          <p className={"auth-title"}>Sign Up</p>
          <p className={"auth-sub-text"}>Equip yourself for anything.</p>
          <button
            className={"login-with-google-button"}
            onClick={() => {
              signInWithGoogle(
                successfulCallbackLogin,
                successfulCallback,
                failedCallback
              );
            }}
          >
            <img
              src={require("../../../assets/Icons/Google-Line.png")}
              alt={"G"}
            />
            Sign up with Google
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
            <p>Sign up with Email</p>
            <div />
          </div>

          <form className={"auth-form"}>
            <p className={"auth-form-title"}>Name</p>
            <input
              className={"auth-form-input"}
              type={"name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={"Jane Doe"}
            />
            <p className={"auth-form-title"}>Email</p>
            <input
              className={"auth-form-input"}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setEmail(e.target.value);
                }
              }}
              placeholder={"mail@domain.com"}
            />
            <p className={"auth-form-title"}>Password</p>
            <input
              className={"auth-form-input"}
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={"Min 8 Characters"}
            />
            <p className={"auth-form-title"}>Confirm Password</p>
            <input
              className={"auth-form-input"}
              type={"password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder={"Min 8 Characters"}
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
          </div>

          <button
            className={"auth-button"}
            onClick={(e) => {
              trySignIn();
            }}
          >
            <p className={"auth-button-text"}>Sign Up</p>
          </button>
          <p className={"auth-text"}>
            Already Registered?{" "}
            <span
              className={"auth-link"}
              onClick={() => {
                switch_to_sign_up();
              }}
            >
              Login Now.
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

export default SignIn;

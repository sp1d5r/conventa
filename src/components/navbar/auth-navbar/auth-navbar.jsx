import React from "react";
import { Link } from "react-router-dom";
import "../navbar.css";

function AuthNavbar() {
  return (
    <div className={"auth-navbar"}>
      <Link className={"auth-back-div"} to={"/"}>
        <img
          className={"auth-back-img"}
          src={require("../../../assets/Icons/back-arrow.png")}
          alt={"back"}
        />
        <p>Back</p>
      </Link>
    </div>
  );
}

export default AuthNavbar;

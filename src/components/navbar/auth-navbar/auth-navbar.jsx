import React from "react";
import "../navbar.css";
import { Link, useLocation } from "react-router-dom";
import auth from "../../../cloud-infrastructure/firebase/firebase";

function AuthNavbar() {
  const path_name = useLocation().pathname.split("/").at(-1);
  const is_auth = path_name === "auth";
  const current_user = auth.currentUser;

  const getPath = () => {
    if (is_auth) {
      return "/";
    } else if (current_user) {
      return "/academy";
    } else {
      return "/auth";
    }
  };

  return (
    <div className={"auth-navbar"}>
      <Link className={"auth-back-div"} to={getPath()}>
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

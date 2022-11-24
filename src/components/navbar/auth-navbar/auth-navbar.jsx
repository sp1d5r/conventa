import React from "react";
import "../navbar.css";
import { Link, useLocation } from "react-router-dom";

function AuthNavbar() {
  const path_name = useLocation().pathname.split("/").at(-1);
  const is_auth = path_name === "auth";

  return (
    <div className={"auth-navbar"}>
      <Link className={"auth-back-div"} to={is_auth ? "/" : "/auth"}>
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

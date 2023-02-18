import "./navbar.css";
import React from "react";
import { useLocation } from "react-router-dom";
import AuthNavbar from "./auth-navbar/auth-navbar";
import NavbarStandard from "./traditional-navbar/standard-navbar";

function NavBar() {
  const path_name = useLocation().pathname.split("/");
  const final_part = path_name.at(-1);
  const back_navigation =
    final_part === "auth" || final_part === "pricing-page";

  if (path_name.at(1) === "lesson") {
    return <></>;
  } else {
    return <>{back_navigation ? <AuthNavbar /> : <NavbarStandard />}</>;
  }
}

export default NavBar;

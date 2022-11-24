import "./navbar.css";
import React from "react";
import { useLocation } from "react-router-dom";
import TraditionalNavbar from "./traditional-navbar/traditional-navbar";
import AuthNavbar from "./auth-navbar/auth-navbar";

function NavBar() {
  const path_name = useLocation().pathname.split("/").at(-1);
  const back_navigation = path_name === "auth" || path_name === "pricing-page";

  return <>{back_navigation ? <AuthNavbar /> : <TraditionalNavbar />}</>;
}

export default NavBar;

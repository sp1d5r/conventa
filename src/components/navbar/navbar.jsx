import "./navbar.css";
import React from "react";
import { useLocation } from "react-router-dom";
import TraditionalNavbar from "./traditional-navbar/traditional-navbar";
import AuthNavbar from "./auth-navbar/auth-navbar";

function NavBar() {
  return (
    <>
      {useLocation().pathname.split("/").at(-1) === "auth" ? (
        <AuthNavbar />
      ) : (
        <TraditionalNavbar />
      )}
    </>
  );
}

export default NavBar;

import "./navbar.css";
import React, { useState } from "react";
import Button from "../button/button";
import { Link } from "react-router-dom";

function NavBar() {
  const [opened, updateOpened] = useState(false);

  return (
    <div className={"navbar"} id={"navbar"}>
      <Link className={"brand"} to={"/"}>
        <p>convento</p>
      </Link>
      {window.innerWidth > 600 ? (
        <div className={"navbar-items"}>
          <div className={"navbar-links"}>
            <Link to="/" className={"navbar-link"}>
              Documentation
            </Link>
            <Link to="/academy" className={"navbar-link"}>
              Academy
            </Link>
            <Link to="/" className={"navbar-link"}>
              Contact Us
            </Link>
            <Link to="/" className={"navbar-link"}>
              About Us
            </Link>
          </div>
          <Link className={"navbar-button"} to={"/auth"}>
            <Button text={"Login"} />
          </Link>
        </div>
      ) : (
        <div className={"navbar-items"}>
          <button
            className={"image-button"}
            onClick={() => updateOpened(!opened)}
          >
            <img
              className={"nav-image"}
              src={require("../../assets/Stack.png")}
              alt={"stack"}
            />
          </button>
        </div>
      )}
      {opened ? (
        <div id="myNav" className="overlay">
          <div className="overlay-content">
            <Link className={"overlay-link"} to="/">
              Documentation
            </Link>
            <Link to="/academy" className={"overlay-link"}>
              Academy
            </Link>
            <Link className={"overlay-link"} to="/">
              Contact Us
            </Link>
            <Link className={"overlay-link"} to="/">
              About Us
            </Link>

            <Link className={"navbar-button-mobile"} to="/auth">
              <Button text={"Login"} />
            </Link>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default NavBar;

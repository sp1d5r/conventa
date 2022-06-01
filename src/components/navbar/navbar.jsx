import "./navbar.css";
import React, { useState } from "react";
import Button from "../button/button";

function NavBar() {
  const [opened, updateOpened] = useState(false);

  return (
    <div className={"navbar"}>
      <div className={"brand"}>
        <p>My Logo</p>
      </div>
      {window.innerWidth > 600 ? (
        <div className={"navbar-items"}>
          <div className={"navbar-links"}>
            <a href={"/"} className={"navbar-link"}>
              Documentation
            </a>
            <a href={"/"} className={"navbar-link"}>
              Academy
            </a>
            <a href={"/"} className={"navbar-link"}>
              Contact Us
            </a>
            <a href={"/"} className={"navbar-link"}>
              About Us
            </a>
          </div>
          <div className={"navbar-button"}>
            <Button text={"Login"} />
          </div>
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
            <a className={"overlay-link"} href="/">
              Documentation
            </a>
            <a className={"overlay-link"} href="/">
              Academy
            </a>
            <a className={"overlay-link"} href="/">
              Contact Us
            </a>
            <a className={"overlay-link"} href="/">
              About Us
            </a>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default NavBar;

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
            {/*<Link to="/" className={"navbar-link"}>
              Documentation
            </Link>*/}
            <Link to="/academy" className={"navbar-link"}>
              Academy
            </Link>
            <Link to="/news-room/" className={"navbar-link"}>
              News Room
            </Link>
            <Link to="/about-us/" className={"navbar-link"}>
              About Us
            </Link>
          </div>
          <Link className={"navbar-button"} to={"/auth"}>
            <Button text={"Login"} />
          </Link>
        </div>
      ) : (
        <div className={"navbar-items"}>
          {opened ? (
            <></>
          ) : (
            <button
              className={"image-button"}
              onClick={() => updateOpened(!opened)}
            >
              <img
                className={""}
                src={require("../../assets/Stack.png")}
                alt={"stack"}
              />
            </button>
          )}
        </div>
      )}
      {opened ? (
        <div id="myNav" className="overlay">
          <div className="overlay-content">
            {/*<Link className={"overlay-link"} to="/">
              Documentation
            </Link>*/}
            <button
              className={"image-button"}
              onClick={() => updateOpened(!opened)}
            >
              <img
                className={"nav-image"}
                style={{ height: "30px" }}
                src={require("../../assets/Icons/slide-up.png")}
                alt={"close"}
              />
            </button>
            <Link
              to="/academy"
              className={"overlay-link"}
              onClick={() => updateOpened(!opened)}
            >
              <p>Academy</p>
              <img
                className={"overlay-image"}
                src={require("../../assets/Icons/books.png")}
                alt={"stack"}
              />
            </Link>
            <Link
              className={"overlay-link"}
              to="/news-room/"
              onClick={() => updateOpened(!opened)}
            >
              <p>News Room</p>
              <img
                className={"overlay-image"}
                src={require("../../assets/Icons/news-room.png")}
                alt={"stack"}
              />
            </Link>
            <Link
              className={"overlay-link"}
              to="/about-us/"
              onClick={() => updateOpened(!opened)}
            >
              <p>About Us</p>
              <img
                className={"overlay-image"}
                src={require("../../assets/Icons/Info.png")}
                alt={"stack"}
              />
            </Link>

            <Link
              className={"navbar-button-mobile"}
              to="/auth"
              onClick={() => updateOpened(!opened)}
            >
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

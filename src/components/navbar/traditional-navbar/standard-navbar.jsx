import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/home/logo.svg";
import WhiteLogo from "../../../assets/about-us/logo-white.svg";
import { useAuth } from "../../../cloud-infrastructure/firebase/auth";
import auth from "../../../cloud-infrastructure/firebase/firebase";

function NavbarStandard() {
  const [opened, updateOpened] = useState(false);
  const size = useWindowSize();
  const isAboutUs = window.location.href.indexOf("about-us") > -1;
  const { signOutUser } = useAuth();
  const current_user = auth.currentUser;

  const signedOutSuccessful = () => {
    window.location.reload();
  };

  const getStack = () => {
    if (size.width < 700) {
      return (
        <button
          onClick={(e) => {
            updateOpened(!opened);
          }}
          className={"login-button-white"}
        >
          <p className={"login-button-white-p"}>menu</p>
        </button>
      );
    } else if (current_user) {
      return (
        <button
          onClick={(e) => {
            signOutUser(signedOutSuccessful);
          }}
          className={"logout-button-white"}
        >
          <p className={"login-button-white-p"}>Logout</p>
        </button>
      );
    } else {
      return (
        <Link to={"/auth"} className={"login-button-white"}>
          <p className={"login-button-white-p"}>Log in</p>
        </Link>
      );
    }
  };

  return (
    <>
      <div className={`navbar ${isAboutUs ? "black" : "white"}`} id={"navbar"}>
        <Link className={"brand"} to={"/"}>
          <img
            className={"brand-img"}
            src={isAboutUs ? WhiteLogo : Logo}
            alt={"logo"}
          />
          <p
            className={`brand-text ${isAboutUs ? "white-text" : "black-text"}`}
          >
            conventa
          </p>
        </Link>

        {size.width > 700 ? (
          <>
            <Link to={"/academy"}>
              <p
                className={`navbar-link-p ${
                  isAboutUs ? "white-text" : "black-text"
                }`}
              >
                Academy
              </p>
            </Link>
            <Link to={"/news-room"}>
              <p
                className={`navbar-link-p ${
                  isAboutUs ? "white-text" : "black-text"
                }`}
              >
                News Room
              </p>
            </Link>
            <Link to={"/about-us"}>
              <p
                className={`navbar-link-p ${
                  isAboutUs ? "white-text" : "black-text"
                }`}
              >
                About Us
              </p>
            </Link>
          </>
        ) : (
          <></>
        )}

        {getStack()}

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
                  src={require("../../../assets/Icons/slide-up.png")}
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
                  src={require("../../../assets/Icons/books.png")}
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
                  src={require("../../../assets/Icons/news-room.png")}
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
                  src={require("../../../assets/Icons/Info.png")}
                  alt={"stack"}
                />
              </Link>
              {current_user ? (
                <button
                  onClick={(e) => {
                    signOutUser(signedOutSuccessful);
                  }}
                  className={"logout-button-white"}
                >
                  <p className={"login-button-white-p"}>Logout</p>
                </button>
              ) : (
                <Link to={"/auth"} className={"login-button-white"}>
                  <p className={"login-button-white-p"}>Log in</p>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default NavbarStandard;

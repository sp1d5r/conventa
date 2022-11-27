import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../button/button";
import { useAuth } from "../../../cloud-infrastructure/firebase/auth";
import auth from "../../../cloud-infrastructure/firebase/firebase";

function TraditionalNavbar() {
  const [opened, updateOpened] = useState(false);
  const size = useWindowSize();
  const { signOutUser } = useAuth();
  const current_user = auth.currentUser;

  const signedOutSuccessful = () => {
    window.location.reload();
  };

  return (
    <div className={"navbar"} id={"navbar"}>
      <Link className={"brand"} to={"/"}>
        <p>conventa</p>
      </Link>
      {size.width > 700 ? (
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
          {current_user ? (
            <button
              onClick={(e) => {
                signOutUser(signedOutSuccessful);
              }}
            >
              Logout
            </button>
          ) : (
            <Link className={"navbar-button"} to={"/auth"}>
              <Button text={"Login"} />
            </Link>
          )}
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
                src={require("../../../assets/Stack.png")}
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

// Hook
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

export default TraditionalNavbar;

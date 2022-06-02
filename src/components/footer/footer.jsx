import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className={"footer-main"}>
      <div className={"footer-main-top"}>
        <div className={"footer-information"}>
          <div className={"footer-information-box"}>
            <p className={"footer-information-heading"}>Practice</p>
            <div className={"footer-information-links"}>
              <a href={"/"}>Courses</a>
              <br />
              <a href={"/"}>Minigames</a>
              <br />
              <a href={"/"}>Skill Tests</a>
            </div>
          </div>
          <div className={"footer-information-box"}>
            <p className={"footer-information-heading"}>Material</p>
            <div className={"footer-information-links"}>
              <a href={"/"}>Youtube</a>
              <br />
              <a href={"/"}>Podcasts</a>
              <br />
              <a href={"/"}>Discord</a>
            </div>
          </div>
          <div className={"footer-information-box"}>
            <p className={"footer-information-heading"}>About us</p>
            <div className={"footer-information-links"}>
              <a href={"/"}>Email</a>
              <br />
              <a href={"/"}>Instagram</a>
              <br />
              <a href={"/"}>Twitter</a>
            </div>
          </div>
        </div>
        <div className={"footer-available-on"}>
          <div className={"footer-available-on-items"}>
            <p>available on:</p>
            <img
              src={require("../../assets/Icons/Apple Logo.png")}
              alt={"available on apple"}
            />
            <img
              src={require("../../assets/Icons/Google.png")}
              alt={"available on Google"}
            />
            <img
              src={require("../../assets/Icons/Windows XP.png")}
              alt={"available on windows"}
            />
          </div>
          <div className={"footer-available-on-items"}>
            <p>Resources from:</p>
            <img
              src={require("../../assets/Icons/Netflix.png")}
              alt={"available on apple"}
            />
            <img
              src={require("../../assets/Icons/YouTube.png")}
              alt={"available on Google"}
            />
          </div>
        </div>
      </div>
      <div className={"footer-main-bottom"}>
        <div className={"footer-bottom-div"}>
          <p>My Brand Name - Copyright 2022 © - All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

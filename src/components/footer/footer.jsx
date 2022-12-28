import React from "react";
import "./footer.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/home/logo.svg";

function Footer() {
  const path_name = useLocation().pathname.split("/").at(-1);
  const back_navigation = path_name === "auth" || path_name === "pricing-page";

  if (!back_navigation) {
    return (
      <div id={"footer-main"} className={"footer-main"}>
        <div className={"footer-main-top"}>
          <div className={"footer-information"}>
            <div className={"footer-information-box"}>
              <p className={"footer-information-heading"}>Navigate</p>
              <div className={"footer-information-links"}>
                <a href={"/about-us"}>About Us</a>
                <a href={"/news-room"}>News Room</a>
                <a href={"/academy"}>Academy</a>
              </div>
            </div>
            <div className={"footer-information-box"}>
              <p className={"footer-information-heading"}>Contact</p>
              <div className={"footer-information-links"}>
                <a href={"/"}>Youtube</a>
                <a href={"/"}>Podcasts</a>
                <a href={"/"}>Discord</a>
              </div>
            </div>
            <div className={"footer-information-box"}>
              <Link className={"brand"} to={"/"}>
                <img className={"brand-img"} src={Logo} alt={"logo"} />
                <p className={`brand-text black-text"`}>conventa</p>
              </Link>
            </div>
          </div>
        </div>
        <div className={"footer-main-bottom"}>
          <div className={"footer-bottom-div"}>
            <p>Conventa - Copyright 2023 © - All rights reserved</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Footer;

import React from "react";
import "./banner.css";
import { Link } from "react-router-dom";

function Banner({ promoMessage, color }) {
  return (
    <>
      <div className={"banner-div"} style={{ backgroundColor: color }}>
        <p className={"banner-text"}>{promoMessage}</p>
        <Link to={"/pricing-page"} className={"banner-button"}>
          <p>get offer!</p>
        </Link>
      </div>
    </>
  );
}

export default Banner;

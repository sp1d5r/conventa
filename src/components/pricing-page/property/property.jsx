import React from "react";
import "./property.css";

function Property({ valid, property_name, selected }) {
  return (
    <div className={"property-div"}>
      <img
        className={"property-image"}
        alt={valid ? "Included:" : "Not Included"}
        src={
          valid
            ? require("../../../assets/Icons/check.png")
            : require("../../../assets/Icons/null.png")
        }
      />
      <p
        className={selected ? "property-value-valid" : "property-value-unvalid"}
      >
        {property_name}
      </p>
    </div>
  );
}

export default Property;

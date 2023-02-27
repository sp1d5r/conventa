import React, { useEffect, useState } from "react";
import Gems from "../../../../assets/lesson/gem.svg";
import "./gems.css";
import { getUserGems } from "../../../../cloud-infrastructure/firebase/firebase";

function TotalGems() {
  const [gems, setGems] = useState(0);

  useEffect(() => {
    getUserGems().then((_gems) => {
      setGems(_gems);
    });
  }, []);

  return (
    <div className={"user-gems"}>
      <p className={"amount-of-gems"}>{gems}</p>
      <img src={Gems} alt={"Gems Earned"} />
    </div>
  );
}

export default TotalGems;

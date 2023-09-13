import React, { useEffect, useState } from "react";
import Gems from "../../../../assets/lesson/gem.svg";
import "./gems.css";
import { getUserGems } from "../../../../cloud-infrastructure/firebase/firebase";
import { useAuth } from "../../../../cloud-infrastructure/firebase/auth";

function TotalGems() {
  const [gems, setGems] = useState(0);
  const { current_user } = useAuth();

  useEffect(() => {
    if (current_user && current_user.uid) {
      getUserGems(current_user.uid).then((_gems) => {
        setGems(_gems);
      });
    }
  }, [current_user]);

  return (
    <div className={"user-gems"}>
      <p className={"amount-of-gems"}>{gems}</p>
      <img src={Gems} alt={"Gems Earned"} />
    </div>
  );
}

export default TotalGems;

import React, { useEffect, useState } from "react";
import "./authenticate.css";
import Login from "./login/login";
import SignUp from "./signup/signup";

function Authenticate() {
  const [login, changeObjective] = useState(true);

  useEffect(() => {
    console.log("Objective changed", login);
  });

  return (
    <div className={"authenticate-home"}>
      {login ? (
        <Login changeObjective={changeObjective} />
      ) : (
        <SignUp changeObjective={changeObjective} />
      )}
    </div>
  );
}

export default Authenticate;

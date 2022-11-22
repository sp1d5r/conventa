import React, { useEffect, useState } from "react";
import "./authenticate.css";
import Login from "./login/login";
import SignUp from "./signup/signup";

function Authenticate() {
  const [login, changeObjective] = useState(true);

  useEffect(() => {
    console.log("Objective changed", login);
  });

  if (login) {
    return <Login changeObjective={changeObjective} />;
  } else {
    return <SignUp changeObjective={changeObjective} />;
  }
}

export default Authenticate;

import React, { useEffect, useRef, useState } from "react";
import "./authenticate.css";
import Login from "./login/login";
import SignUp from "./signup/signup";

function Authenticate() {
  const size = window.innerWidth < 600;
  const [login, changeObjective] = useState(true);
  const initial = useRef(true);

  useEffect(() => {
    initialise();
  }, [login]);

  const initialise = () => (initial.current = false);

  if (login) {
    return (
      <Login changeObjective={changeObjective} initial={initial} size={size} />
    );
  } else {
    return (
      <SignUp changeObjective={changeObjective} initial={initial} size={size} />
    );
  }
}

export default Authenticate;

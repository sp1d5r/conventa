import React, { useEffect, useRef, useState } from "react";
import "./authenticate.css";
import Login from "./login";
import SignUp from "./signup/signup";
import { getCurrentUser } from "../../cloud-infrastructure/firebase/firebase";
import { useNavigate } from "react-router-dom";

function Authenticate() {
  const size = window.innerWidth < 600;
  const [login, changeObjective] = useState(true);
  const initial = useRef(true);
  const navigator = useNavigate();

  useEffect(() => {
    initialise();
    getCurrentUser().then((res) => {
      if (res) {
        navigator("/academy");
      }
    });
  }, [login, navigator]);

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

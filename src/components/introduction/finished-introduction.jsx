import React from "react";
import "./introduction.css";
import { useNavigate } from "react-router-dom";

function FinishedIntroduction() {
  const navigate = useNavigate();
  return (
    <>
      <div className={"introduction-main-page"}>
        <div className={"intro-complete-page"}>
          <b>Finished Configuration</b>
          <p>We'll optimise your conventa experience accordingly.</p>
          <button
            onClick={() => {
              navigate("/academy");
            }}
            className={"skip-button green"}
          >
            Academy
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedIntroduction;

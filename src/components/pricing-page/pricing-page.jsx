import React, { useEffect, useState } from "react";
import "./pricing-page.css";
import PricingSidePanel from "./pricing-side-panel/pricing-side-panel";
import TimeRadioButton from "./time-radio-button/time-radio-button";
import PricingSelectCard from "./pricing-select-card/pricing-select-card";
import { Link } from "react-router-dom";

function PricingPage() {
  const [is_annual, setAnnual] = useState(true);
  const [plan_selected, setPlan] = useState(2);
  const window_size = useWindowSize();

  return (
    <>
      <div className={"pricing-main"}>
        {window_size.width < 1000 ? <></> : <PricingSidePanel />}
        <div className={"pricing-body"}>
          <div className={"pricing-heading"}>
            <h1 className={"pricing-title"}>Upgrade your Plan</h1>
            <TimeRadioButton is_annual={is_annual} setAnnual={setAnnual} />
          </div>

          <p className={"pricing-body-text"}>
            If you’re just getting started, the free plan is an excellent choice
            - if you want to unlock all the features of the platform pick from
            our options below:
          </p>

          <div className={"pricing-cards-container"}>
            <PricingSelectCard
              setPlan={setPlan}
              title={"Hobbiest"}
              price={15}
              level={1}
              selected={plan_selected === 1}
            />

            <PricingSelectCard
              setPlan={setPlan}
              title={"Amateur"}
              price={25}
              level={2}
              selected={plan_selected === 2}
            />

            <PricingSelectCard
              setPlan={setPlan}
              title={"Professional"}
              price={150}
              level={3}
              selected={plan_selected === 3}
            />
          </div>
          <div className={"pricing-call-to-action"}>
            <span className={"pricing-cta-text"}>
              Happy with your plan already?
              <Link to={"/academy"} className={"pricing-text-underline"}>
                {" "}
                Continue.
              </Link>
            </span>
          </div>
          <div className={"pricing-call-to-action"}>
            {/* TODO - remove this to add stripe payment */}
            <Link to={"/academy"} className={"pricing-button-link"}>
              <button className={"pricing-call-to-action-button"}>
                Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default PricingPage;

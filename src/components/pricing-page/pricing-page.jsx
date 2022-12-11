import React, { useEffect, useState } from "react";
import "./pricing-page.css";
import PricingSidePanel from "./pricing-side-panel/pricing-side-panel";
import TimeRadioButton from "./time-radio-button/time-radio-button";
import PricingSelectCard from "./pricing-select-card/pricing-select-card";
import { Link, useNavigate } from "react-router-dom";
import auth, {
  createCheckoutSession,
} from "../../cloud-infrastructure/firebase/firebase";

function PricingPage() {
  const [is_annual, setAnnual] = useState(true);
  const [plan_selected, setPlan] = useState(2);
  const [loading, setLoading] = useState(false);
  const window_size = useWindowSize();
  const current_user = auth.currentUser;
  const navigator = useNavigate();

  if (!current_user) {
    navigator("/auth");
  }

  const goToStripe = () => {
    setLoading(!loading);
    createCheckoutSession(
      current_user.uid,
      plan_selected,
      is_annual ? 2 : 1
    ).then((r) => console.log("here"));
  };

  return (
    <>
      {loading ? (
        <div className={"overlay-loading"}>
          <div className={"overlay-loading-div"}>
            <h4>Sending you to Stripe...</h4>
          </div>
        </div>
      ) : (
        <></>
      )}
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
              price={100}
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
            <button
              className={"pricing-call-to-action-button"}
              onClick={(_) => {
                goToStripe();
              }}
            >
              Purchase
            </button>
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

import React, { useState } from "react";
import "./pricing-page.css";
import PricingSidePanel from "./pricing-side-panel/pricing-side-panel";
import TimeRadioButton from "./time-radio-button/time-radio-button";
import PricingSelectCard from "./pricing-select-card/pricing-select-card";
import PricingSelectedCard from "./pricing-selected-card/pricing-selected-card";

function PricingPage() {
  const [is_annual, setAnnual] = useState(true);
  const [plan_selected, setPlan] = useState(2);

  return (
    <>
      <div className={"pricing-main"}>
        <PricingSidePanel />
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
            {plan_selected === 1 ? (
              <PricingSelectedCard
                setPlan={setPlan}
                title={"Hobbiest"}
                price={15}
                level={1}
              />
            ) : (
              <PricingSelectCard
                setPlan={setPlan}
                title={"Hobbiest"}
                price={15}
                level={1}
              />
            )}
            {plan_selected === 2 ? (
              <PricingSelectedCard
                setPlan={setPlan}
                title={"Amateur"}
                price={15}
                level={2}
              />
            ) : (
              <PricingSelectCard
                setPlan={setPlan}
                title={"Amateur"}
                price={15}
                level={2}
              />
            )}
            {plan_selected === 3 ? (
              <PricingSelectedCard
                setPlan={setPlan}
                title={"Professional"}
                price={150}
                level={3}
              />
            ) : (
              <PricingSelectCard
                setPlan={setPlan}
                title={"Professional"}
                price={150}
                level={3}
              />
            )}
          </div>
          <div className={"pricing-call-to-action"}>
            <span className={"pricing-cta-text"}>
              Happy with your plan already?
              <span className={"pricing-text-underline"}>Continue.</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingPage;

import React, { useEffect, useState } from "react";
import "./pricing-page-main.css";
import RadioSwitch from "../landing/cost/radio-switch";
import {
  createCheckoutSession,
  getCurrentUser,
  getUserClaim,
  logFirebaseEvent,
} from "../../cloud-infrastructure/firebase/firebase";
import { useNavigate } from "react-router-dom";

function CostCard({
  recommended,
  current_plan,
  locked,
  selected,
  index,
  select,
  price,
  timeframe,
  properties,
}) {
  const get_current_plan = () => {
    if (current_plan >= index) {
      return (
        <div className={"current-plan-bar"}>
          <p>{current_plan === index ? "Current Plan" : "Included Plan"}</p>
        </div>
      );
    }
  };
  return (
    <div
      className={`cost-card${selected ? "-selected" : ""} ${
        current_plan >= index ? "locked-card" : ""
      } `}
      onClick={() => {
        if (!locked && current_plan < index) {
          select(index);
        }
      }}
    >
      {locked ? (
        <div className={"locked-bar"}>
          <p>Currently Locked</p>
        </div>
      ) : (
        <></>
      )}

      {recommended ? (
        <div className={"recommended-bar"}>
          <p>Recommended</p>
        </div>
      ) : (
        <></>
      )}

      {get_current_plan()}

      <div className={"cost-card-title"}>
        <h3>{price}</h3>
        <p>per {timeframe}</p>
      </div>

      {properties.map((elem) => {
        return <p className={"cost-card-property"}>{elem}</p>;
      })}
    </div>
  );
}

function PricingPageMain() {
  const [monthly, setMonthly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [current_user, setCurrentUser] = useState(null);
  const [current_plan, setCurrentPlan] = useState(0);
  const [selected, setSelected] = useState(1); // set to current_plan + 1
  const navigator = useNavigate();

  const switchMonthly = () => {
    setMonthly(!monthly);
  };

  const goToStripe = () => {
    setLoading(true);
    createCheckoutSession(current_user.uid, selected, monthly).then((r) => {});
  };

  const getPrice = () => {
    if (monthly) {
      if (selected === 0) {
        return 3;
      } else if (selected === 1) {
        return 5;
      } else {
        return 15;
      }
    } else {
      if (selected === 0) {
        return 15;
      } else if (selected === 1) {
        return 30;
      } else {
        return 100;
      }
    }
  };

  useEffect(() => {
    getCurrentUser().then((res) => {
      getUserClaim().then((res) => {
        var _currentPlan = -1;
        if (res === "Hobbiest") {
          _currentPlan = 0;
        } else if (res === "Amateur") {
          _currentPlan = 1;
        } else if (res === "Professional") {
          _currentPlan = 2;
        }
        setSelected(Math.max(_currentPlan + 1, 1));
        setCurrentPlan(_currentPlan);
      });
      if (res) {
        setCurrentUser(res);
      } else {
        navigator("/auth");
      }
    });
  }, [navigator]);

  useEffect(() => {
    logFirebaseEvent("pricing_page", {});
  }, []);

  return (
    <>
      <div className={"pricing-page-main"}>
        {loading ? (
          <>
            <div className={"overlay-loading-main"}>
              <div className={"overlay-loading-main-div"}>
                <img
                  src={require("../../assets/Icons/loading.gif")}
                  alt={"loading your content"}
                />
                <h4 className={"loading-text"}>Sending you to Stripe...</h4>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className={"cost-heading"}>
          <h1 className={"intro-text-h1 competence-text"}>
            Upgrade your plan!
          </h1>
          <RadioSwitch switchMonthly={switchMonthly} />
        </div>
        <span className={"cost-main-text"}>
          A lot of our courses are free - and if you have special circumstances
          email us at
        </span>
        <div></div>
        <a
          className={"cost-main-text cost-main-link"}
          href={"mailto: support@conventa.net"}
        >
          {" "}
          support@conventa.net
        </a>
        <div className={"cost-cards-div"}>
          <CostCard
            recommended={false}
            locked={true}
            selected={selected === 0}
            current_plan={current_plan}
            index={0}
            select={setSelected}
            price={monthly ? "£3" : "£30"}
            timeframe={monthly ? "month" : "year"}
            properties={[
              "Access to all written articles",
              "Access to all written courses",
              "Preview some interactive minigames",
            ]}
          />
          <CostCard
            recommended={true}
            locked={true}
            selected={selected === 1}
            current_plan={current_plan}
            index={1}
            select={setSelected}
            price={monthly ? "£5" : "£45"}
            timeframe={monthly ? "month" : "year"}
            properties={[
              "Access to all written articles & courses",
              "Access to all interactive minigames",
              "Preview some beta imitations",
            ]}
          />
          <CostCard
            recommended={false}
            locked={true}
            selected={selected === 2}
            current_plan={current_plan}
            index={2}
            select={setSelected}
            price={monthly ? "£15" : "£120"}
            timeframe={monthly ? "month" : "year"}
            properties={[
              "Access to all written articles & courses",
              "Access to all interactive minigames",
              "Access to all beta imitations",
            ]}
          />
        </div>
        <div className={"recipet"}>
          <p>
            total:{" "}
            <span className={"bold"}>
              £{getPrice()}.00 {monthly ? "per month" : "per year"}
            </span>
          </p>
        </div>

        <button
          className={"checkout-button"}
          onClick={() => {
            console.log("");
            if (loading) {
              goToStripe();
            }
          }}
        >
          <b>Unavailable for now...</b>
        </button>
      </div>
    </>
  );
}

export default PricingPageMain;

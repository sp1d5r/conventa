import "./App.css";
import NavBar from "./components/navbar/navbar";
import React from "react";
import Jumbotron from "./components/landing/Jumbotron/jumbotron";
import Why from "./components/landing/Why/why";
import Help from "./components/landing/Help/help";
import How from "./components/landing/How/how";
import PricingPlan from "./components/landing/Pricing/pricing-plan";
import EmotionalIntelligence from "./components/landing/Emotional Intelligence/emotional_intelligence";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Jumbotron />
      <Why />
      <Help />
      <How />
      <EmotionalIntelligence />
      <PricingPlan />`
      <div className={"what-are-you-waiting-for"}>
        <p>What are you waiting for?</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;

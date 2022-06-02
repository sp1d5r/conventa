import "./App.css";
import NavBar from "./components/navbar/navbar";
import React from "react";
import Jumbotron from "./components/landing/jumbotron";
import Why from "./components/landing/Why/why";
import Help from "./components/landing/Help/help";
import How from "./components/landing/How/how";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Jumbotron />
      <Why />
      <Help />
      <How />
    </div>
  );
}

export default App;

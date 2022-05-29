import './App.css';
import NavBar from "./components/navbar/navbar";
import React from "react";
import Jumbotron from "./components/landing/jumbotron";
import Why from "./components/landing/Why/why";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Jumbotron/>
        <Why/>
    </div>
  );
}

export default App;

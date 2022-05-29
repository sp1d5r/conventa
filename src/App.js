import './App.css';
import NavBar from "./components/navbar/navbar";
import React from "react";
import Jumbotron from "./components/landing/jumbotron";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Jumbotron/>
    </div>
  );
}

export default App;

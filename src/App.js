import "./App.css";
import NavBar from "./components/navbar/navbar";
import React from "react";
import Footer from "./components/footer/footer";
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticate from "./components/auth/authenticate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/" element={<Landing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

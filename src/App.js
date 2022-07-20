import "./App.css";
import NavBar from "./components/navbar/navbar";
import React from "react";
import Footer from "./components/footer/footer";
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticate from "./components/auth/authenticate";
import Academy from "./components/academy/academy";
import CourseLanding from "./components/course-page/course-landing";
import LessonPage from "./components/lesson/lesson-page";
import FirstImpressions from "./components/minigames/first-impressions/first-impressions";
import ScrollToTop from "./components/routing/scroll-to-top";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/academy" element={<Academy loggedIn={false} />} />
          <Route path="/course/" element={<CourseLanding />} />
          <Route path="/lesson/" element={<LessonPage />} />
          <Route
            path="/minigame/First%20Impressions"
            element={<FirstImpressions />}
          />
          <Route path="/" element={<Landing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

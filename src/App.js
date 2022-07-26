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
import CatchALiar from "./components/minigames/to-catch-a-liar/catch-a-liar";
import ScrollToTop from "./components/routing/scroll-to-top";
import TrackingClientEmotions from "./components/minigames/tracking-client-emotions/tracking-client-emotions";
import AboutUs from "./components/about-us/about-us";

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
          <Route path="/about-us/" element={<AboutUs />} />
          <Route
            path="/minigame/First%20Impressions"
            element={<FirstImpressions />}
          />
          <Route path="/minigame/Catch%20a%20Liar" element={<CatchALiar />} />
          <Route
            path="/minigame/Tracking%20Client%20Emotions"
            element={<TrackingClientEmotions />}
          />
          <Route path="/" element={<Landing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

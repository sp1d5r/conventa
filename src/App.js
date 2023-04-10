import "./App.css";
import NavBar from "./components/navbar/navbar";
import React from "react";
import Footer from "./components/footer/footer";
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticate from "./components/auth/authenticate";
import Academy from "./components/academy/academy";
import CourseLanding from "./components/course-page/course-landing";
import FirstImpressions from "./components/minigames/first-impressions/first-impressions";
import CatchALiar from "./components/minigames/to-catch-a-liar/catch-a-liar";
import ScrollToTop from "./components/routing/scroll-to-top";
import TrackingClientEmotions from "./components/minigames/tracking-client-emotions/tracking-client-emotions";
import AboutUs from "./components/about-us/about-us";
import NewsRoom from "./components/news-room/news-room";
import AuthProvider from "./cloud-infrastructure/firebase/auth";
import NewLessonPage from "./components/lesson/lesson-page";
import EffectiveSpeaking from "./components/minigames/effective-speaking/effective-speaking";
import ContentLocked from "./components/content-locked/content-locked";
import PricingPageMain from "./components/pricing-page/pricing-page-main";
import Introduction from "./components/introduction/introduction";
import { onMessageListener } from "./cloud-infrastructure/firebase/firebase";

function App() {
  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <ScrollToTop />
          <Routes>
            <Route path="/auth" element={<Authenticate />} />
            <Route path="/academy" element={<Academy loggedIn={false} />} />
            <Route path="/course/" element={<CourseLanding />} />
            <Route path="/content-locked/" element={<ContentLocked />} />
            <Route path="/lesson/" element={<NewLessonPage />} />
            <Route path="/about-us/" element={<AboutUs />} />
            <Route path="/pricing-page/" element={<PricingPageMain />} />
            <Route path="/news-room/" element={<NewsRoom />} />
            <Route path={"/introduction"} element={<Introduction />} />
            <Route
              path="/minigame/First%20Impressions"
              element={<FirstImpressions />}
            />
            <Route
              path={"/minigame/Effective%20Speaking"}
              element={<EffectiveSpeaking />}
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
    </AuthProvider>
  );
}

export default App;

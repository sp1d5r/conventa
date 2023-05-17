import React from "react";
import NewsHeading from "./news-heading/news-heading";
// import NewsHeadline from "./news-headline/news-headline";
// import NewsStories from "./news-stories/news-stories";
import Image from "../../assets/news-room/main-icon.svg";

function NewsRoom() {
  return (
    <div>
      <NewsHeading />
      {/*<NewsHeadline />*/}
      {/*<NewsStories />*/}
      <div className={"article-of-day-div after-intro-animation"}>
        <div className={"article-of-day-tracker"}>
          <button className="logout-button-white button-color-change">
            2023-04-12
          </button>
          <b className="article-day-text">Daily Paper: 2023-05-12</b>

          <button className="logout-button-white button-color-change">
            2023-04-13
          </button>
        </div>
        <div className={"article-day-main"}>
          <div className="news-paper-today">
            <b>Todays Paper</b>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div className={"article-of-day-main-text"}>
            <p>Unleashing Your Inner Entrepreneur:</p>
            <p className={"article-of-day-main-bold"}>
              Mastering the Mind-Body Connection for Business Success
            </p>
            <p className={"article-of-day-light"}>
              Discover the power of a harmonious mind-body connection to
              revolutionize your entrepreneurial journey. Unlock your full
              potential, increase focus, and cultivate resilience for a thriving
              and successful business experience.
            </p>
            <a className={"underline"} href={"/"}>
              Read more
            </a>
          </div>
          <div className={"article-of-day-image"}>
            <img src={Image} alt={"Mind body connection"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsRoom;

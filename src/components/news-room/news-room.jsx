import React from "react";
import NewsHeading from "./news-heading/news-heading";
// import NewsHeadline from "./news-headline/news-headline";
// import NewsStories from "./news-stories/news-stories";
import Image from "../../assets/news-room/main-icon.svg";

function NewsRoomCard({ backgroundColor, title, description, link }) {
  return (
    <div
      className="news-room-card"
      style={{ backgroundColor: backgroundColor }}
      onClick={() => {
        window.location.href = link;
      }}
    >
      <h3 className={"card-main-text-bold"}>{title}</h3>
      <p className={"article-of-day-light"}>
        {description.substring(0, window.innerWidth < 700 ? 70 : 180) + "..."}
      </p>
      <a className={"underline"} href={"/"}>
        Read more
      </a>
    </div>
  );
}

function NewsRoom() {
  return (
    <div>
      <NewsHeading />
      {/*<NewsHeadline />*/}
      {/*<NewsStories />*/}
      <div className={"article-of-day-div after-intro-animation"}>
        <div className={"article-of-day-tracker"}>
          <button className="logout-button-white button-color-change"></button>
          <b className="article-day-text">
            Daily Paper: {new Date().toLocaleDateString()}
          </b>

          <button className="logout-button-white button-color-change"></button>
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
        <div className="news-room-card-grid">
          <NewsRoomCard
            title={"Mastering the Mind-Body Connection for Business Success"}
            description={
              "Discover the power of a harmonious mind-body connection to\n" +
              "              revolutionize your entrepreneurial journey. Unlock your full\n" +
              "              potential, increase focus, and cultivate resilience for a thriving\n" +
              "              and successful business experience."
            }
            link={"/article?id=1"}
            backgroundColor={"#e3fffb"}
          />

          <NewsRoomCard
            title={"Mastering the Mind-Body Connection for Business Success"}
            description={
              "Discover the power of a harmonious mind-body connection to\n" +
              "              revolutionize your entrepreneurial journey. Unlock your full\n" +
              "              potential, increase focus, and cultivate resilience for a thriving\n" +
              "              and successful business experience."
            }
            link={"/article?id=1"}
            backgroundColor={"#e3fdff"}
          />

          <NewsRoomCard
            title={"Mastering the Mind-Body Connection for Business Success"}
            description={
              "Discover the power of a harmonious mind-body connection to\n" +
              "              revolutionize your entrepreneurial journey. Unlock your full\n" +
              "              potential, increase focus, and cultivate resilience for a thriving\n" +
              "              and successful business experience."
            }
            link={"/article?id=1"}
            backgroundColor={"#fff"}
          />

          <NewsRoomCard
            title={"Mastering the Mind-Body Connection for Business Success"}
            description={
              "Discover the power of a harmonious mind-body connection to\n" +
              "              revolutionize your entrepreneurial journey. Unlock your full\n" +
              "              potential, increase focus, and cultivate resilience for a thriving\n" +
              "              and successful business experience."
            }
            link={"/article?id=1"}
            backgroundColor={"#e9e3ff"}
          />

          <NewsRoomCard
            title={"Mastering the Mind-Body Connection for Business Success"}
            description={
              "Discover the power of a harmonious mind-body connection to\n" +
              "              revolutionize your entrepreneurial journey. Unlock your full\n" +
              "              potential, increase focus, and cultivate resilience for a thriving\n" +
              "              and successful business experience."
            }
            link={"/article?id=1"}
            backgroundColor={"#f5e3ff"}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsRoom;

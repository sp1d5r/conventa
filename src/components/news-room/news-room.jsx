import React, { useEffect, useState } from "react";
import NewsHeading from "./news-heading/news-heading";
// import NewsHeadline from "./news-headline/news-headline";
// import NewsStories from "./news-stories/news-stories";
import Image from "../../assets/news-room/main-icon.svg";
import { getPosts } from "../../cloud-infrastructure/ghost/Articles";

function NewsRoomCard({ article, backgroundColor }) {
  console.log(article.feature_image);
  return (
    <div
      className="news-room-card"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `linear-gradient(to top, ${backgroundColor}, transparent), url(${article.feature_image})`,
      }}
      onClick={() => {
        window.location.href = `/article?id=${article.id}`;
      }}
    >
      <img
        src={article.feature_image}
        alt={article.feature_image_alt}
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          height: "45%",
          objectFit: "cover",
        }}
      />
      <div style={{ backgroundColor: "white", zIndex: 1, padding: 20 }}>
        <h3 className={"card-main-text-bold"} style={{ zIndex: 1 }}>
          {article.title}
        </h3>
        <p className={"article-of-day-light"} style={{ zIndex: 1 }}>
          {article.excerpt.substring(0, window.innerWidth < 700 ? 70 : 180) +
            "..."}
        </p>
        <a
          className={"underline"}
          href={`/article?id=${article.id}`}
          style={{ zIndex: 1 }}
        >
          Read more
        </a>
      </div>
    </div>
  );
}

function NewsRoom() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getPosts().then((res) => {
      setArticles([...res]);
      console.log(res);
    });
  }, []);

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
            <a className={"underline"} href={"/article?id=1"}>
              Read more
            </a>
          </div>
          <div className={"article-of-day-image"}>
            <img src={Image} alt={"Mind body connection"} />
          </div>
        </div>
        <div className="news-room-card-grid">
          {articles &&
            articles.map((article, index) => {
              return <NewsRoomCard article={article} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default NewsRoom;

import React from "react";
import NewsHeading from "./news-heading/news-heading";
import NewsHeadline from "./news-headline/news-headline";
import NewsStories from "./news-stories/news-stories";

function NewsRoom() {
  return (
    <div>
      <NewsHeading />
      <NewsHeadline />
      <NewsStories />
    </div>
  );
}

export default NewsRoom;

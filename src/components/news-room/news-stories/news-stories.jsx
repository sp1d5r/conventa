import React, { useState } from "react";
import NewsCardSmall from "./news-card-small";
import "../news-room.css";
import NewsPagination from "./news-pagination";

/*
TODO list:

 */

const template_story = {
  title: "title",
  imageURL: "image-url",
};

const news_stories = [
  template_story,
  template_story,
  template_story,
  template_story,
  template_story,
];

function NewsStories() {
  const [_news_stories, setNewsStories] = useState(news_stories);

  const get_total_pages = () => {
    return 3;
  };

  const get_news_stories = (start) => {
    /* Starting at index start get the next 16 stories */
    return news_stories;
  };

  const update_page = (page) => {
    const index = 16 * page;
    setNewsStories(get_news_stories(index));
  };

  return (
    <div className={"news-headline-container"}>
      <p className={"news-stories-headline-text"}>Other Popular Stories</p>
      <div className={"news-stories-container"}>
        <div className={"news-stories-main"}>
          {_news_stories.map((item) => {
            return <NewsCardSmall content={item} />;
          })}
        </div>
      </div>
      <NewsPagination
        update_page={update_page}
        total_pages={get_total_pages()}
      />
    </div>
  );
}

export default NewsStories;

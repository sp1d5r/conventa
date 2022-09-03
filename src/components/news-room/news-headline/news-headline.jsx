import React, { useEffect, useState } from "react";
import axios from "axios";

import "../news-room.css";

/*
TODO list:
- Make the annimation for the loading screen opacity
- Get template for the "Todays headline"
- get the first article draft
- get a breifing of what it'll look like with medium integration
- Make text loading annimation on the todays headline
 */

function NewsHeadline() {
  const [content, setContent] = useState({});

  async function seomthing() {
    try {
      return await axios.get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@almazahmad03"
      );
    } catch (error) {
      console.log("error" + error);
    } finally {
      console.log("Retrieved posts");
    }
  }

  useEffect(() => {
    seomthing().then((result) => {
      setContent(result.data.items[0]);
    });
  }, []);

  return (
    <div className={"news-headline after-intro-animation"}>
      <div className={"news-headline-container"}>
        <p className={"news-headline-todays-headline-text"}>TODAYS HEADLINE</p>
        <a href={"/"} className={"news-headline-todays-story"}>
          <img
            className={"news-headline-image"}
            src={content.thumbnail}
            alt={"This is the thumbnail for the first article."}
          />
          <div className={"news-headline-content"}>
            <p className={"news-headline-title"}>{content.title}</p>
            <p className={"news-headline-description"}>description</p>
            <div className={"news-headline-div-options"}>
              <button className={"share-button"}></button>
              <button className={"share-button"}></button>
              <button className={"share-button"}></button>
              <button className={"share-button"}></button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NewsHeadline;

import React, { useEffect } from "react";
import { change_color } from "../../cloud-infrastructure/utils/color";
import "./article.css";
import Markdown from "markdown-to-jsx";

function Article() {
  const article = {
    date: "January 12th 2023",
    heading: "7 Rules of Effective Branding",
    subheading: "Why branding matters in your business",
    landingImageSrc: "",
    tags: ["Branding", "Communication", "Experience", "Identity"],
    mainBodyMD:
      "**Branding lets you identify your target demographic and discuss the" +
      "most up-to-date research around branding for your organisation** \n \n" +
      "See how this article can help you achieve your goals.",
  };

  useEffect(() => {
    change_color("#FFFFFF");
  }, []);

  return (
    <div className={"article-main-body"}>
      <div className={"article-main-heading"}>
        <p className={"article-published"}>Published on {article.date}</p>
        <p className={"article-heading"}>{article.heading}</p>
        <p className={"article-subheading"}>{article.subheading}</p>
        <div className={"article-tags"}>
          {article.tags.map((elem) => {
            return <div className={"article-tag"}>{elem}</div>;
          })}
        </div>
      </div>

      {/* Put an image in this when i get the design correct */}
      <img
        alt={"placeholder article jumbotron"}
        src={"/placeholder-article-image.png"}
        className={"article-image"}
      />

      <div className={"article-main-body"}>
        <Markdown children={article.mainBodyMD} />
      </div>
    </div>
  );
}

export default Article;

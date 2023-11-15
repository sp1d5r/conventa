import React, { useEffect, useState } from "react";
import { change_color } from "../../cloud-infrastructure/utils/color";
import "./article.css";
import CopyLink from "../../assets/Icons/article/icons8-copy-link-80.png";
import Facebook from "../../assets/Icons/article/icons8-facebook-150.png";
import Linkedin from "../../assets/Icons/article/icons8-linkedin-150.png";
import Twitter from "../../assets/Icons/article/icons8-twitter-150.png";
import { useLocation } from "react-router-dom";
import { getSinglePost } from "../../cloud-infrastructure/ghost/Articles";

function Article() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [action, setAction] = useState("");
  const [article, setArticle] = useState({});

  useEffect(() => {
    change_color("#FFFFFF");
    console.log(id);
    getSinglePost(id).then((res) => {
      setArticle(res);
      console.log(res);
    });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        // Run your command or perform the desired action here
        console.log("Command executed!");
        setAction("");
      }, 3000);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return article ? (
    <div className={"article-main-body"}>
      <div className={"article-main-heading"}>
        <p className={"article-published"}>
          Published on{" "}
          {article.published_at &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(article.published_at))}
        </p>
        <p className={"article-heading"}>{article.title}</p>
        <p className={"article-subheading"}>{article.excerpt}</p>
        <div className={"article-tags"}>
          {article.tags &&
            article.tags.map((elem) => {
              return <div className={"article-tag"}>{elem.name}</div>;
            })}
        </div>
      </div>

      {/* Put an image in this when i get the design correct */}
      <img
        alt={article.feature_image_alt}
        src={article.feature_image}
        className={"article-image"}
      />
      <div className={"article-share-buttons"}>
        <div
          onClick={() => {
            // navigator.clipboard.writeText(
            //   `https://www.conventa.net/article?id=${id}`
            // );
            setAction("Copied to Clipboard");
          }}
        >
          <img
            className={"article-share-icon"}
            src={CopyLink}
            alt={"Copy to clipboard"}
          />
        </div>
        <a href={"/"}>
          <img
            className={"article-share-icon"}
            src={Twitter}
            alt={"Share to Twitter"}
          />
        </a>
        <a href={"/"}>
          <img
            className={"article-share-icon"}
            src={Linkedin}
            alt={"Share to Linkedin"}
          />
        </a>
        <a href={"/"}>
          <img
            className={"article-share-icon"}
            src={Facebook}
            alt={"Share to Facebook"}
          />
        </a>
      </div>
      <div
        className={"gh-canvas gh-content"}
        dangerouslySetInnerHTML={{ __html: article.html }}
      ></div>

      {action !== "" ? (
        <div className={"absolute-action-div"}>
          <p>{action}</p>
        </div>
      ) : (
        <></>
      )}

      {/*{article && article.authors && <div style={{width: "500px", display: "flex", gap: 10, justifyContent: "center", alignItems: "center", margin: 20}}>*/}
      {/*  <div style={{height: 50, width: 50, border: "2px solid black", borderRadius: 50}} >*/}
      {/*  </div>*/}
      {/*  <div style={{display: "flex", flexDirection: "column", gap:1, textAlign: "left"}}>*/}
      {/*    <h4 className="gh-article-author-name"><a href="/author/al/">{article.authors[0].name}</a></h4>*/}
      {/*    <div className="gh-article-meta-content">*/}
      {/*      <time className="gh-article-meta-date" dateTime="2023-11-15">Nov 15, 2023</time>*/}
      {/*      <span className="gh-article-meta-length"><span className="bull">—</span> 2 min read</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>}*/}
    </div>
  ) : (
    <></>
  );
}

export default Article;

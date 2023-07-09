import React, { useEffect, useState } from "react";
import { change_color } from "../../cloud-infrastructure/utils/color";
import "./article.css";
import Markdown from "markdown-to-jsx";
import CopyLink from "../../assets/Icons/article/icons8-copy-link-80.png";
import Facebook from "../../assets/Icons/article/icons8-facebook-150.png";
import Linkedin from "../../assets/Icons/article/icons8-linkedin-150.png";
import Twitter from "../../assets/Icons/article/icons8-twitter-150.png";
import { useLocation } from "react-router-dom";

function Article() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [action, setAction] = useState("");

  const article = {
    date: "January 12th 2023",
    heading: "7 Rules of Effective Branding",
    subheading: "Why branding matters in your business",
    landingImageSrc: "",
    tags: ["Branding", "Communication", "Experience", "Identity"],
    mainBodyMD: `
      
**Sales are the lifeblood of any business. The principles of effective selling allow you to connect with your prospects, understand their needs, and ultimately, turn them into customers.**

Let's see how this article can help you achieve your goals. 

### 1. Understand Your Customer

Every successful sale starts with understanding your customer. You should know their pain points, their needs, and their desires. This allows you to tailor your product or service to their specific needs.

### 2. Build Strong Relationships

Sales is all about relationships. The better the relationship you have with your customers, the more likely they are to purchase from you. Build trust and credibility by being honest, respectful, and professional.

### 3. Communicate Effectively

Clear and effective communication is crucial in sales. Ensure that you are listening to your customer and understanding their needs. Use clear language, avoid jargon, and ensure your message is easily understood.

### 4. Focus on Benefits, Not Features

Customers don't buy products, they buy benefits. Instead of focusing on the features of your product, focus on how it can solve a problem or make life easier for your customer.

### 5. Always Be Closing

The ABC of sales - Always Be Closing. This doesn't mean you should be pushy, but rather, you should always be looking for opportunities to close the deal. This includes overcoming objections and addressing any concerns your customer may have.

### 6. Use Technology to Your Advantage

In the digital age, there are many tools and technologies that can help you in sales. Use CRM systems, email marketing, social media, and other digital tools to reach your customers and keep track of your sales.

### 7. Never Stop Learning

The world of sales is always changing, and to be successful, you need to stay up-to-date. Keep learning, keep improving, and stay on top of industry trends.

These 7 rules of effective sales can help you connect with your customers and close more deals. Implement them into your sales strategy and watch your success grow.
      
      `,
  };

  useEffect(() => {
    change_color("#FFFFFF");
  }, []);

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
      <div className={"article-share-buttons"}>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `https://www.conventa.net/article?id=${id}`
            );
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
      <div className={"article-body"}>
        <Markdown children={article.mainBodyMD} />
      </div>

      {action !== "" ? (
        <div className={"absolute-action-div"}>
          <p>{action}</p>
        </div>
      ) : (
        <></>
      )}

      <div className={"article-end"}>
        <div className={"article-rate-article-div"}>
          <p>Rate this Article:</p>
          <div style={{ height: 20, width: 20, backgroundColor: "red" }}></div>
          <div style={{ height: 20, width: 20, backgroundColor: "red" }}></div>
          <div style={{ height: 20, width: 20, backgroundColor: "red" }}></div>
          <div style={{ height: 20, width: 20, backgroundColor: "red" }}></div>
          <div style={{ height: 20, width: 20, backgroundColor: "red" }}></div>
        </div>

        <div className={"article-recommended-articles"}>
          <div className={"article-recommended-article"}>
            <p className={"article-recommended-heading"}>{article.heading}</p>
            <p>{article.subheading}</p>
            <p>Published on {article.date}</p>
          </div>
          <div className={"article-recommended-article"}>
            <p className={"article-recommended-heading"}>{article.heading}</p>
            <p>{article.subheading}</p>
            <p>Published on {article.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;

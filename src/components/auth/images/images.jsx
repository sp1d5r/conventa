import React from "react";
import "./images.css";
import RelationshipsBGSVG from "../../../assets/authenticate/relationships/background-bottom.svg";
import ConfidenceBGSVG from "../../../assets/authenticate/confidence/background-bottom.svg";
import BusinessBGSVG from "../../../assets/authenticate/business/background-bottom.svg";
import { Carousel } from "react-bootstrap";

function LoginImages() {
  return (
    <Carousel slide={false} variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ConfidenceBGSVG}
          alt="First slide"
        />
        <Carousel.Caption className={"captions"}>
          <h3 className={"caption-title"}>Learn Confidence Skills</h3>
          <p className={"caption-subtext"}>
            Practically learn confidence skills to help you handle any situation
            with composure.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={RelationshipsBGSVG}
          alt="First slide"
        />
        <Carousel.Caption className={"captions"}>
          <h3 className={"caption-title"}>Learn Relationships Skills</h3>
          <p className={"caption-subtext"}>
            Practice the appropriate skills you need to develop and maintain a
            relationship.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={BusinessBGSVG} alt="First slide" />
        <Carousel.Caption className={"captions"}>
          <h3 className={"caption-title"}>Learn Business Skills</h3>
          <p className={"caption-subtext"}>
            Use spaced repetition to learn business skills in a more effective
            way.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/*<SingleImage title={"Learn Confidence Skills"} subtext={"Practically learn confidence skills to help you handle any\n" +*/}
      {/*    "situation with composure."} backgroundSVG={ConfidenceBGSVG}/>*/}
      {/*<SingleImage title={"Learn Relationship Skills"} subtext={"Practice the appropriate skills you need to develop and \n" +*/}
      {/*    "maintain a relationship."} backgroundSVG={RelationshipsBGSVG}/>*/}
      {/*<SingleImage title={"Learn Business Skills"} subtext={"Use spaced repetition to learn business skills \n" +*/}
      {/*    "in a more effective way."} backgroundSVG={BusinessBGSVG}/>*/}
    </Carousel>
  );
}

export default LoginImages;

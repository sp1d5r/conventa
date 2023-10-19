import React from "react";
import "./featured-card.css";
import { Link } from "react-router-dom";

export default function FeaturedCard() {
  return (
    <Link
      className={"featured-card"}
      to={"/course/?course_id=yQy5HVoMOaZdrZipqTGW"}
    >
      <div className={"featured-class-lhs"}>
        <h1 className="featured-tagline">FEATURED</h1>
        <h1 className="academy-title featured-title">
          The Procrastination Detox
        </h1>
        <div className={"featured-badges"}>
          <div className="badge featured-badge"> Self-Help</div>
          <div className="badge featured-badge"> Personal Development</div>
          <div className="badge featured-badge"> Growth</div>
        </div>
        <p>
          Eradicate procrastination, unlock your full potential, and transform
          your productivity landscape with our meticulously crafted 10-lesson
          course.
        </p>
      </div>

      <div className={"featured-card-rhs"}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/convento-453e6.appspot.com/o/course-images%2FProcrastination%20Detox.png?alt=media&amp;token=b877f9d3-b654-42e2-9106-4fa375bb31a1"
          className={"featured-card-img"}
          alt={"Procrastination Lab Detoxing..."}
        />
      </div>
    </Link>
  );
}

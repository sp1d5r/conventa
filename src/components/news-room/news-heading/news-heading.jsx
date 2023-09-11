import React from "react";
import "../news-room.css";

/*
TODO list:
- Make a div with the following annimation
- white dot in the center
- grows vertically
- once it's a line, the line grows horizontally
- when the screen is covered into white,
- it'll slowly lose transparency
- The News Room Appears
- Stocks pricing start moving around the top and the bottom
 */

function NewsHeading() {
  return (
    <div className={"news-room-heading"}>
      <div className="scrolling-text">
        <p>
          Breaking News: Overcoming Procrastination: Expert tips on boosting
          productivity and seizing the day... The Wisdom of Stoicism: How
          ancient philosophies can bring modern contentment... Burnout Alert:
          Identifying the signs and steps to rejuvenate your passion and
          purpose... Unlocking Inner Motivation: Techniques to rediscover your
          drive and ambition... Embracing Minimalism: Simplifying your life for
          enhanced focus and clarity... The Power of Habit: Small changes for
          significant transformations in daily routines... Mindfulness Matters:
          Embracing the present moment for a life of fulfillment... Stoic
          Strategies: Navigating life's challenges with a balanced
          perspective... Combatting Burnout: Daily practices to ensure you stay
          at the top of your game... The Science of Motivation: Why we do what
          we do and how to do it better... Practical Stoicism: Adapting ancient
          wisdom for contemporary challenges... Overcome Procrastination: Steps
          to jump-start your journey and accomplish your goals... Revive and
          Thrive: Strategies to counter burnout and reclaim your zest for
          life... Staying Motivated: Harnessing internal and external drivers
          for long-term success...
        </p>
      </div>
      <div className={"news-room-heading-annimation"}>
        <p className={"news-room-heading-title after-intro-animation"}>
          <span style={{ color: "#e3fffb" }}>T</span>
          <span style={{ color: "#e3fdff" }}>h</span>
          <span style={{ color: "#e3ebff" }}>e</span>
          <span style={{ color: "#fff" }}> </span>
          <span style={{ color: "#e9e3ff" }}>N</span>
          <span style={{ color: "#e9e3ff" }}>e</span>
          <span style={{ color: "#f5e3ff" }}>w</span>
          <span style={{ color: "#f5e3ff" }}>s</span>
          <span style={{ color: "#f5e3ff" }}> </span>
          <span style={{ color: "#ffe3ec" }}>R</span>
          <span style={{ color: "#ffe3e3" }}>o</span>
          <span style={{ color: "#ffede3" }}>o</span>
          <span style={{ color: "#fffce3" }}>m</span>
        </p>
      </div>

      <div className="scrolling-text">
        <p>
          Breaking News: Overcoming Procrastination: Expert tips on boosting
          productivity and seizing the day... The Wisdom of Stoicism: How
          ancient philosophies can bring modern contentment... Burnout Alert:
          Identifying the signs and steps to rejuvenate your passion and
          purpose... Unlocking Inner Motivation: Techniques to rediscover your
          drive and ambition... Embracing Minimalism: Simplifying your life for
          enhanced focus and clarity... The Power of Habit: Small changes for
          significant transformations in daily routines... Mindfulness Matters:
          Embracing the present moment for a life of fulfillment... Stoic
          Strategies: Navigating life's challenges with a balanced
          perspective... Combatting Burnout: Daily practices to ensure you stay
          at the top of your game... The Science of Motivation: Why we do what
          we do and how to do it better... Practical Stoicism: Adapting ancient
          wisdom for contemporary challenges... Overcome Procrastination: Steps
          to jump-start your journey and accomplish your goals... Revive and
          Thrive: Strategies to counter burnout and reclaim your zest for
          life... Staying Motivated: Harnessing internal and external drivers
          for long-term success...
        </p>
      </div>
    </div>
  );
}

export default NewsHeading;

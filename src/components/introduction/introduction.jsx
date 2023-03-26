import React, { useEffect, useState } from "react";
import "./introduction.css";
import ProgressBar from "../lesson/progress-bar/progress-bar";
import Leaf from "../../assets/Icons/introduction/Leaf.png";
import Love from "../../assets/Icons/introduction/Love.png";
import BusinessStrategy from "../../assets/Icons/introduction/BusinessStrategy.png";
import Dumbell from "../../assets/Icons/introduction/Dumbbell.png";
import Circle2 from "../../assets/Icons/introduction/Circled2.png";
import Circle5 from "../../assets/Icons/introduction/Circled5.png";
import Circle10 from "../../assets/Icons/introduction/LogicDataTypes.png";
import Circle30 from "../../assets/Icons/introduction/30Degrees.png";
import HotArticle from "../../assets/Icons/introduction/HotArticle.png";
import Media from "../../assets/Icons/introduction/Media.png";
import Minigames from "../../assets/Icons/introduction/Minigames.png";
import Movies from "../../assets/Icons/introduction/MoviesFolder.png";
import Stopwatch from "../../assets/Icons/introduction/SportStopwatch.png";
import Sun from "../../assets/Icons/introduction/Sun.png";
import Calendar from "../../assets/Icons/introduction/TearOffCalendar.png";
import Never from "../../assets/Icons/introduction/Never.png";
import NationPark from "../../assets/Icons/introduction/NationalPark.png";
import SignleYou from "../../assets/Icons/introduction/YouSingular.png";
import UserGroups from "../../assets/Icons/introduction/UserGroups.png";
import TheatreStages from "../../assets/Icons/introduction/TheatreStage.png";
import Children from "../../assets/Icons/introduction/Children.png";
import Romance from "../../assets/Icons/introduction/Romance.png";
import Friends from "../../assets/Icons/introduction/Friends.png";
import Handshake from "../../assets/Icons/introduction/Handshake.png";
import MoneyBags from "../../assets/Icons/introduction/MoneyBag.png";
import Report from "../../assets/Icons/introduction/StatisticsReport.png";
import Store from "../../assets/Icons/introduction/NewStore.png";
import Other from "../../assets/Icons/introduction/ViewMore.png";
import LawnCare from "../../assets/Icons/introduction/LawnCare.png";
import PottedPlant from "../../assets/Icons/introduction/PottedPlant.png";
import Bamboo from "../../assets/Icons/introduction/Bamboo.png";
import OakTree from "../../assets/Icons/introduction/OakTree.png";
import FinishedIntroduction from "./finished-introduction";

const INTRODUCTION_QUESTIONS = {
  title: "What are you hoping to learn from Conventa?",
  subtext: "Before you begin lets get to know you a bit more",
  icons: [Leaf, BusinessStrategy, Love, Dumbell],
  texts: [
    "Handle Situations",
    "Improve Business Skills",
    "Improve Relationships",
    "Improve Mental Strength",
  ],
  singleSelect: false,
};

const FINAL_QUESTIONS = [
  {
    title: "How frequently are you able to work towards your goal?",
    subtext:
      "We use spaced repetition and do not advice to work for longer than this a day",
    icons: [Circle2, Circle5, Circle10, Circle30],
    texts: [
      "2 minutes/day",
      "5 minutes/day",
      "10 minutes/day",
      "30 minutes/day",
    ],
    singleSelect: true,
  },
  {
    title: "What type of content works best for you?",
    subtext:
      "We use spaced repetition and do not advice to work for longer than this a day",
    icons: [HotArticle, Media, Minigames, Movies],
    texts: [
      "Long-form articles",
      "Short-form Engaging Content",
      "Interactive Minigames",
      "Videos",
    ],
    singleSelect: true,
  },
];

const CARISMA_QUESTIONS = [
  {
    title: "How often are you nervous?",
    subtext: "Select the most appropriate one.",
    icons: [Stopwatch, Sun, Calendar, Never],
    texts: ["Always", "A few times a day", "A few days a week", "Never"],
    singleSelect: true,
  },
  {
    title: "How confident are you now?",
    subtext: "Select the most appropriate one.",
    icons: [NationPark, SignleYou, UserGroups, TheatreStages],
    texts: ["Always", "A few times a day", "A few days a week", "Never"],
    singleSelect: true,
  },
];
const BUSINESS_STRATEGY = [
  {
    title: "Why do you want to improve your business skills?",
    subtext: "Select the most appropriate one.",
    icons: [MoneyBags, Report, Store, Other],
    texts: [
      "Looking for a promotion/raise",
      "Improve sales commissions",
      "Have your own business",
      "Other",
    ],
    singleSelect: true,
  },
  {
    title: "How long have you been in business?",
    subtext:
      "Now matter how long you’ve been in business we’ll try\n" +
      "to provide up-to-date research.",
    icons: [LawnCare, PottedPlant, Bamboo, OakTree],
    texts: ["Just starting out", "1-5 years", "5-10 years", "10 years plus +"],
    singleSelect: true,
  },
];
const RELATIONSHIPS_STRATEGY = [
  {
    title: "What types of relationships are you trying to improve?",
    subtext: "Select all the options you require.",
    icons: [Children, Romance, Friends, Handshake],
    texts: [
      "With your children",
      "With your partner",
      "With your friends",
      "New relationships",
    ],
    singleSelect: false,
  },
];

function IntroductionMainSelected({
  title,
  subtext,
  icons,
  texts,
  singleSelect,
  submitSelect,
}) {
  const [selectedOptions, setSelectedOptions] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    setSelectedOptions({ ...{ 0: false, 1: false, 2: false, 3: false } });
  }, [texts]);

  const selectOption = (index) => {
    const _selectedOptions = { ...selectedOptions };
    if (singleSelect) {
      const items = [0, 1, 2, 3];
      for (var i in items) {
        _selectedOptions[i] = i == index; // eslint-disable-line
      }
    } else {
      _selectedOptions[index] = !_selectedOptions[index];
    }
    setSelectedOptions(_selectedOptions);
  };

  const submit = () => {
    submitSelect(selectedOptions);
  };

  return (
    <>
      <div className={"introduction-main-card"}>
        <div className={"introduction-title-text"}>
          <p className={"introduction-subtext"}>{subtext}</p>
          <p className={"introduction-title"}>{title}</p>
        </div>
        {texts.map((elem, index) => {
          return (
            <div
              className={`introduction-selection-option ${
                selectedOptions[index] ? "selected" : ""
              }`}
              onClick={() => {
                selectOption(index);
              }}
              key={index}
            >
              <img src={icons[index]} alt={"_"} />
              <p className={"introduction-selection-text"}>{texts[index]}</p>
            </div>
          );
        })}
        <div className={"introduction-button-buttons"}>
          <button className={"skip-button white"}>Skip</button>
          <button
            className={"skip-button green"}
            onClick={() => {
              submit();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

function Introduction() {
  const [currentLesson, setCurrentLesson] = useState([INTRODUCTION_QUESTIONS]);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);

  const submitValues = (selectedOptions) => {
    const remainingQuestions = [...currentLesson];
    if (index === 0) {
      // Do the initial Stuff
      if (selectedOptions[0]) {
        remainingQuestions.push(CARISMA_QUESTIONS[0]);
        remainingQuestions.push(CARISMA_QUESTIONS[1]);
      }

      if (selectedOptions[1]) {
        remainingQuestions.push(BUSINESS_STRATEGY[0]);
        remainingQuestions.push(BUSINESS_STRATEGY[1]);
      }

      if (selectedOptions[2]) {
        remainingQuestions.push(RELATIONSHIPS_STRATEGY[0]);
      }

      // Add final standard questions
      remainingQuestions.push(FINAL_QUESTIONS[0]);
      remainingQuestions.push(FINAL_QUESTIONS[1]);
      setCurrentLesson([...remainingQuestions]);
      setIndex(1);
    }
    if (index < remainingQuestions.length - 1) {
      setIndex(index + 1);
      console.log("here");
    } else {
      console.log("index", index, currentLesson.length);
      setFinished(true);
    }
  };

  return (
    <>
      {finished ? (
        <FinishedIntroduction />
      ) : (
        <div className={"introduction-main-page"}>
          <ProgressBar
            currentProgress={index}
            totalPages={currentLesson.length}
          />
          {currentLesson[index] && (
            <IntroductionMainSelected
              title={currentLesson[index]["title"]}
              subtext={currentLesson[index]["subtext"]}
              icons={currentLesson[index]["icons"]}
              texts={currentLesson[index]["texts"]}
              singleSelect={currentLesson[index]["singleSelect"]}
              submitSelect={submitValues}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Introduction;

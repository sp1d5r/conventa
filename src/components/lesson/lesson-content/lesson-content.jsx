import React from "react";
import "./lesson-content.css";
import TextPage from "./pages/text-page";
import QuestionPage from "./pages/question-page";
import FinalPage from "./pages/final-page";
import SelectionTextPage from "./pages/selection-text-page";
import SelectionImagePage from "./pages/selection-image-page";
import BuildSentencePage from "./pages/build-sentence-page";
import SingleWordPage from "./pages/single-word-page";
// import FlipAndSelect from "./pages/flip-and-select";
import MatchCards from "./pages/match-cards-page";
import CaseStudyPage from "./pages/case-study-page";
import BinaryClassificationPage from "./pages/binary-classification-page";
import OrderList from "./pages/order-list";
import FeedbackButton from "./pages/feedback-button/feedback-button";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/* Used for flip and select and match select*/
function removeKeysWithDuplicateValues(obj) {
  const result = {};
  const seenValues = new Set();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (!seenValues.has(value)) {
        seenValues.add(value);
        result[key] = value;
      }
    }
  }

  return result;
}

function LessonContent({
  type,
  content,
  status,
  submit,
  lessonCompleteSubmit,
  lessonCompleteBack,
  lessonCompleteNextLesson,
  gems,
  pageId,
  lessonId,
  courseId,
}) {
  const feedbackButton = (
    <FeedbackButton pageId={pageId} lessonId={lessonId} courseId={courseId} />
  );

  if (type === "text") {
    return (
      <TextPage
        content={content}
        viewed={status !== "" && status !== "furthest"}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "question") {
    return (
      <QuestionPage
        question={content.question}
        options={content.questions}
        correctAnswer={content.answer}
        viewed={status !== "" && status !== "furthest"}
        submit={submit}
        explanation={content.explanation}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "final") {
    return (
      <FinalPage
        lessonTitle={content.title}
        lessonCompleteSubmit={lessonCompleteSubmit}
        lessonCompleteBack={lessonCompleteBack}
        lessonCompleteNextLesson={lessonCompleteNextLesson}
        gems={gems}
      />
    );
  } else if (type === "selection_text") {
    return (
      <SelectionTextPage
        question={content.question}
        options={content.questions}
        correctAnswer={content.answer}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "selection_image") {
    return (
      <SelectionImagePage
        question={content.question}
        sources={content.questions.map((elem) => elem.src)}
        options={content.questions.map((elem) => elem.content)}
        correctAnswer={content.answer}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "build_sentence") {
    return (
      <BuildSentencePage
        options={shuffle(
          content.split(" ").map((elem) => {
            return elem.replace(/_/g, " ");
          })
        )}
        correctAnswer={content.replace(/_/g, " ")}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "single_word") {
    return (
      <SingleWordPage
        sentence={content.sentence}
        word={content.word}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "flip_and_select") {
    const mapping_new = removeKeysWithDuplicateValues(content.mapping);
    return (
      <MatchCards
        question={content.question}
        mapping={mapping_new}
        reverseMapping={Object.fromEntries(
          Object.entries(mapping_new).map(([key, value]) => [value, key])
        )}
        shuffledValues={shuffle(Object.values(mapping_new))}
        submit={submit}
        feedbackButton={feedbackButton}
      />
      // Changed flip and select due to bugs
      // <FlipAndSelect
      //   question={content.question}
      //   mapping={content.mapping}
      //   shuffledValues={shuffle(Object.values(content.mapping))}
      //   submit={submit}
      // />
    );
  } else if (type === "match_cards") {
    const mapping_new = removeKeysWithDuplicateValues(content.mapping);
    return (
      <MatchCards
        question={content.question}
        mapping={mapping_new}
        reverseMapping={Object.fromEntries(
          Object.entries(mapping_new).map(([key, value]) => [value, key])
        )}
        shuffledValues={shuffle(Object.values(mapping_new))}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "case_study") {
    return (
      <CaseStudyPage
        content={content.story}
        caseStudy={content.title}
        submit={submit}
        feedbackButton={feedbackButton}
      />
    );
  } else if (type === "binary_classifier") {
    return (
      <BinaryClassificationPage
        submit={submit}
        categoryOne={content.category_one}
        categoryTwo={content.category_two}
        optionOneResult={content.category_one_options}
        optionTwoResult={content.category_two_options}
        allShuffled={shuffle(
          content.category_one_options.concat(content.category_two_options)
        )}
        feedbackButton={feedbackButton}
      ></BinaryClassificationPage>
    );
  } else if (type === "order_list") {
    return (
      <OrderList
        submit={submit}
        shuffledList={shuffle([...content.correct_order])}
        question={content.question}
        correctOrder={content.correct_order}
        feedbackButton={feedbackButton}
      />
    );
  } else {
    console.log("Could not load content", content);
  }
}

export default LessonContent;

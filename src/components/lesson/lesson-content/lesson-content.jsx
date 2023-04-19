import React from "react";
import "./lesson-content.css";
import TextPage from "./pages/text-page";
import QuestionPage from "./pages/question-page";
import FinalPage from "./pages/final-page";
import SelectionTextPage from "./pages/selection-text-page";
import SelectionImagePage from "./pages/selection-image-page";
import BuildSentencePage from "./pages/build-sentence-page";
import SingleWordPage from "./pages/single-word-page";
import FlipAndSelect from "./pages/flip-and-select";
import MatchCards from "./pages/match-cards-page";
import CaseStudyPage from "./pages/case-study-page";
import BinaryClassificationPage from "./pages/binary-classification-page";
import OrderList from "./pages/order-list";

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

function LessonContent({
  type,
  content,
  status,
  submit,
  lessonCompleteSubmit,
  lessonCompleteBack,
  lessonCompleteNextLesson,
}) {
  if (type === "text") {
    return (
      <TextPage
        content={content}
        viewed={status !== "" && status !== "furthest"}
        submit={submit}
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
      />
    );
  } else if (type === "final") {
    return (
      <FinalPage
        lessonTitle={content.title}
        lessonCompleteSubmit={lessonCompleteSubmit}
        lessonCompleteBack={lessonCompleteBack}
        lessonCompleteNextLesson={lessonCompleteNextLesson}
      />
    );
  } else if (type === "selection_text") {
    return (
      <SelectionTextPage
        question={content.question}
        options={content.questions}
        correctAnswer={content.answer}
        submit={submit}
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
      />
    );
  } else if (type === "build_sentence") {
    return (
      <BuildSentencePage
        options={shuffle(content.split(" "))}
        correctAnswer={content}
        submit={submit}
      />
    );
  } else if (type === "single_word") {
    return (
      <SingleWordPage
        sentence={content.sentence}
        word={content.word}
        submit={submit}
      />
    );
  } else if (type === "flip_and_select") {
    return (
      <FlipAndSelect
        question={content.question}
        mapping={content.mapping}
        shuffledValues={shuffle(Object.values(content.mapping))}
        submit={submit}
      />
    );
  } else if (type === "match_cards") {
    return (
      <MatchCards
        question={content.question}
        mapping={content.mapping}
        reverseMapping={Object.fromEntries(
          Object.entries(content.mapping).map(([key, value]) => [value, key])
        )}
        shuffledValues={shuffle(Object.values(content.mapping))}
        submit={submit}
      />
    );
  } else if (type === "case_study") {
    return (
      <CaseStudyPage
        content={content.story}
        caseStudy={content.title}
        submit={submit}
      />
    );
  } else if (type === "binary_classification") {
    const valueOne = Object.values(content.mapping)[0];
    const valueTwo = Object.values(content.mapping)[1];
    return (
      <BinaryClassificationPage
        submit={submit}
        categoryOne={Object.keys(content.mapping)[0]}
        categoryTwo={Object.keys(content.mapping)[1]}
        optionOneResult={valueOne}
        optionTwoResult={valueTwo}
        allShuffled={shuffle(valueOne.concat(valueTwo))}
      ></BinaryClassificationPage>
    );
  } else if (type === "order_list") {
    return (
      <OrderList
        submit={submit}
        shuffledList={shuffle(content)}
        correctOrder={content}
      />
    );
  }
}

export default LessonContent;

import React from "react";
import "./lesson-content.css";
import TextPage from "./pages/text-page";
import QuestionPage from "./pages/question-page";
import FinalPage from "./pages/final-page";
import SelectionTextPage from "./pages/selection-text-page";
import SelectionImagePage from "./pages/selection-image-page";
import BuildSentencePage from "./pages/build-sentence-page";
import SingleWordPage from "./pages/single-word-page";

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
  }
}

export default LessonContent;

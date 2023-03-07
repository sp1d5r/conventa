import React from "react";
import "./lesson-content.css";
import TextPage from "./pages/text-page";
import QuestionPage from "./pages/question-page";
import FinalPage from "./pages/final-page";
import SelectionTextPage from "./pages/selection-text-page";
import SelectionImagePage from "./pages/selection-image-page";

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
  }
}

export default LessonContent;

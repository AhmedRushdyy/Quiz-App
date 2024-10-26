import React from "react";
import Question from "./Question";

export default function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Question question={question} answer={answer} dispatch={dispatch} />
      </div>
    </div>
  );
}

import React from "react";

export default function Progress({
  index,
  numQuestions,
  sumPoints,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={answer !== null ? index + 1 : index}
      />
      <p>
        <strong>Questions </strong>
        {index + 1}/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{sumPoints}
      </p>
    </header>
  );
}

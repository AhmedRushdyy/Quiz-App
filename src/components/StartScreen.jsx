import React from "react";

export default function StartScreen({ length, dispatch }) {
  return (
    <div className="start">
      <h2>Wellcome to React Quiz</h2>
      <h3>{length} Questions</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

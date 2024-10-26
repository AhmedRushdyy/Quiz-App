import React from "react";

export default function FinishScreen({ points, sumPoints, dispatch }) {
  const percentage = Math.ceil((points / sumPoints) * 100) + "%";
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {sumPoints} ({percentage})
      </p>
      <br />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

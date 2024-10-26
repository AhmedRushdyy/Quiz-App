import React from "react";

export default function Question({ question, dispatch, answer }) {
  return (
    <>
      {question.options.map(function (el, i) {
        return (
          <button
            disabled={answer !== null}
            className={`btn btn-option  ${answer === i ? "answer" : ""} ${
              answer == null
                ? ""
                : i === question.correctOption
                ? "correct"
                : "wrong"
            }`}
            key={el}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {el}
          </button>
        );
      })}
    </>
  );
}

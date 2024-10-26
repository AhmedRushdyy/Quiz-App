import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secRemain: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        points: 0,
        index: 0,
        answer: null,
        secRemain: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return { ...state, status: "finished" };
    case "tick":
      return {
        ...state,
        secRemain: state.secRemain - 1,
        status: state.secRemain <= 0 ? "finished" : state.status,
      };
    default:
      return;
  }
}
function App() {
  const [{ questions, status, index, answer, points, secRemain }, dispatch] =
    useReducer(reducer, initialState);
  const length = questions.length;
  const sumPoints = questions.reduce(
    (pre, cur) => Number(pre) + Number(cur.points),
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={length}
              sumPoints={sumPoints}
              points={points}
              answer={answer}
            />

            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              points={points}
            />
            {answer !== null && (
              <button
                className="btn btn-ui"
                onClick={() =>
                  index === length - 1
                    ? dispatch({ type: "finished" })
                    : dispatch({ type: "nextQuestion" })
                }
              >
                Next
              </button>
            )}
            <Timer dispatch={dispatch} secRemain={secRemain} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            sumPoints={sumPoints}
            points={points}
            index={index}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

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
  questions: [
    {
      question: "Which is the most popular JavaScript framework?",
      options: ["Angular", "React", "Svelte", "Vue"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which company invented React?",
      options: ["Google", "Apple", "Netflix", "Facebook"],
      correctOption: 3,
      points: 10,
    },
    {
      question: "What's the fundamental building block of React apps?",
      options: ["Components", "Blocks", "Elements", "Effects"],
      correctOption: 0,
      points: 10,
    },
    {
      question:
        "What's the name of the syntax we use to describe the UI in React components?",
      options: ["FBJ", "Babel", "JSX", "ES2015"],
      correctOption: 2,
      points: 10,
    },
    {
      question: "How does data flow naturally in React apps?",
      options: [
        "From parents to children",
        "From children to parents",
        "Both ways",
        "The developers decides",
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question: "How to pass data into a child component?",
      options: ["State", "Props", "PropTypes", "Parameters"],
      correctOption: 1,
      points: 10,
    },
    {
      question: "When to use derived state?",
      options: [
        "Whenever the state should not trigger a re-render",
        "Whenever the state can be synchronized with an effect",
        "Whenever the state should be accessible to all components",
        "Whenever the state can be computed from another state variable",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question: "What triggers a UI re-render in React?",
      options: [
        "Running an effect",
        "Passing props",
        "Updating state",
        "Adding event listeners to DOM elements",
      ],
      correctOption: 2,
      points: 20,
    },
    {
      question: 'When do we directly "touch" the DOM in React?',
      options: [
        "When we need to listen to an event",
        "When we need to change the UI",
        "When we need to add styles",
        "Almost never",
      ],
      correctOption: 3,
      points: 20,
    },
    {
      question: "In what situation do we use a callback to update state?",
      options: [
        "When updating the state will be slow",
        "When the updated state is very data-intensive",
        "When the state update should happen faster",
        "When the new state depends on the previous state",
      ],
      correctOption: 3,
      points: 30,
    },
    {
      question:
        "If we pass a function to useState, when will that function be called?",
      options: [
        "On each re-render",
        "Each time we update the state",
        "Only on the initial render",
        "The first time we update the state",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question:
        "Which hook to use for an API request on the component's initial render?",
      options: ["useState", "useEffect", "useRef", "useReducer"],
      correctOption: 1,
      points: 10,
    },
    {
      question:
        "Which variables should go into the useEffect dependency array?",
      options: [
        "Usually none",
        "All our state variables",
        "All state and props referenced in the effect",
        "All variables needed for clean up",
      ],
      correctOption: 2,
      points: 30,
    },
    {
      question: "An effect will always run on the initial render.",
      options: [
        "True",
        "It depends on the dependency array",
        "False",
        "In depends on the code in the effect",
      ],
      correctOption: 0,
      points: 30,
    },
    {
      question:
        "When will an effect run if it doesn't have a dependency array?",
      options: [
        "Only when the component mounts",
        "Only when the component unmounts",
        "The first time the component re-renders",
        "Each time the component is re-rendered",
      ],
      correctOption: 3,
      points: 20,
    },
  ],
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  secRemain: null,
};
function reducer(state, action) {
  switch (action.type) {
    // case "dataRecieved":
    //   return { ...state, questions: action.payload, status: "ready" };
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

  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataRecieved", payload: data }))
  //     .catch((err) => dispatch({ type: "error" }));
  // }, []);
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

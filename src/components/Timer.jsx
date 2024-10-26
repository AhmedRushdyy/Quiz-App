import React, { useEffect } from "react";

export default function Timer({ dispatch, secRemain }) {
  const mins = Math.floor(secRemain / 60);
  const secs = secRemain % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 ? "0" + mins : mins} : {secs < 10 ? "0" + secs : secs}
    </div>
  );
}

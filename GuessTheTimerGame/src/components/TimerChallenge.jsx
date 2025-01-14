import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const di = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // when the timer finish this will opent the modal
  if (timeRemaining <= 0) {
    di.current.open();
    clearInterval(timer.current);
  }
  function handleRestTimeRemaining() {
    setTimeRemaining(targetTime * 1000);
  }
  // handle start of timer
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }
  // handle close of timer
  function handleStop() {
    clearInterval(timer.current);
    di.current.open();
  }
  return (
    <>
      <ResultModal
        ref={di}
        targetTime={targetTime}
        handleStop={handleStop}
        timeRemaining={timeRemaining}
        handleRestTimeRemaining={handleRestTimeRemaining}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challengeTime">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "stop" : "start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : " timer inactive "}
        </p>
      </section>
    </>
  );
}

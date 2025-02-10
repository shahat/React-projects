import { useEffect, useState } from "react";

const QuestionTimer = ({ timer, goToNext ,mode}) => {
  const [remainingTime, setRemainingTime] = useState(timer);
  
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const questionTimer = setTimeout(() => {
      goToNext && goToNext();
    }, timer);
    return () => {
      clearTimeout(questionTimer);
    };
  }, [goToNext]);

  return (
    <progress id="question-time" max={timer}
     value={remainingTime} className={mode}></progress>
  );
};

export default QuestionTimer;

import { useState, useCallback, useRef } from "react";
import questions from "../assets/questions";
import CompletedTask from "./CompletedTask";
import Question from "./Question";
const time = 10000;

export default function Quiz() {
  const [userAnswers, setuserAnswers] = useState([]);
  const selectedQuestion = userAnswers.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setuserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  }, []);
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  return selectedQuestion === questions.length ? (
    <CompletedTask userAnswers={userAnswers} />
  ) : (
    <div id="quiz">
      <Question
        key={selectedQuestion}
        index={selectedQuestion}
        onSelectAnswer={handleSelectAnswer}
        goToNext={handleSkipAnswer}
        time={time}
      />
    </div>
  );
}

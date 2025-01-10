import UserInput from "./components/UserInput";
import { useState } from "react";
import Header from "./components/Header";
import Results from "./components/Results";

function App() {
  // initial investment
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const inputIsValid = userInput && userInput.duration > 0;
  // handle input change event
  function handleChange(inputIdentifire, newInputValue) {
    // convert the new input value to a number before updating the state
    setUserInput((preState) => ({
      ...preState,

      [inputIdentifire]: +newInputValue,
    }));
  }
  return (
    <>
      <Header />
      <UserInput userInput={userInput} handleChange={handleChange} />
      <Results userInput={userInput} />
    </>
  );
}

export default App;

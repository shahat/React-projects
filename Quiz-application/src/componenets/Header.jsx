import React from "react";
import quiz_logo from "../assets/quiz-logo.png" 
function Header() {
  return <header>
    <img src={quiz_logo} alt="the quiz logo" />
    <h1>The Quiz</h1>
  </header>;
}
export default Header;

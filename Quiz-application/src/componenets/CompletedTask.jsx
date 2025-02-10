import Completed_img from "../assets/quiz-complete.png";
import Questions from "../assets/questions";
function CompletedTask({userAnswers}) {

const skippedAnswers = userAnswers.filter(answer => answer === null);
const correctAnswers = userAnswers.filter((answer, index) => answer === Questions[index].answers[0]);
const skippedAnswersPercent = Math.round((skippedAnswers.length / userAnswers.length) * 100);
const correctAnswersPercent = Math.round((correctAnswers.length / userAnswers.length) * 100);

const wrongAsnwersprecent = 100 - skippedAnswersPercent - correctAnswersPercent;

  return <div id="summary">
        <img src={Completed_img} alt=" completed tasks img " />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
          <p>
            <span className="number">{skippedAnswersPercent}%</span>
            <span className="text">Skipped</span>
          </p>
          <p>
            <span className="number">{correctAnswersPercent}</span>
            <span className="text">answered correctlly </span>
          </p>
          <p>
            <span className="number">{wrongAsnwersprecent}</span>
            <span className="text">Answered incorrectlly </span>
          </p>
        </div>
        <ol>
          {
            userAnswers.map((answer, index) => {
              let cssClass = "user-answer";
              if (answer === null) {
                cssClass += " skipped";
              } else if (answer === Questions[index].answers[0]) {
                cssClass += " correct";
              } else {
                cssClass += " wrong";
              }
              return (
                <li key={index}>
                  <h3 >{index + 1} </h3>
                  <p className="question">{Questions[index].text}</p>
                  <p className= {cssClass}>{answer ?? "skipped"}</p>
                    </li>

          )})}
          
        
        </ol>
      </div>
}
export default CompletedTask;

import { useState } from "react";
function UserInput({ userInput, handleChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment"> Initial Investment </label>
          <input
            value={userInput.initialInvestment}
            type="number"
            id="initial-investment"
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="annual-investment"> Annual Investment </label>
          <input
            type="number"
            id="annual-investment"
            value={userInput.annualInvestment}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return"> Expected Return </label>
          <input
            type="number"
            id="expected-return"
            value={userInput.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="duration"> Duration </label>
          <input
            type="number"
            id="duration"
            value={userInput.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </p>
      </div>
    </section>
  );
}
export default UserInput;

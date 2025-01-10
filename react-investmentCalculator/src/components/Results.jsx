import { calculateInvestmentResults, formatter } from "../util/investment";
function Results({ userInput }) {
  const results = calculateInvestmentResults(userInput);
  if (results.length <= 0) {
    return <p className="center">Please enter deuration gretter that 0</p>;
  }
  // calculate the initial investment value at the end of the investment period
  //  i solved the problem of crashing the application using the if statement to make sure that duration is greater than 0
  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;
  return (
    <table id="result">
      <thead>
        <tr>
          <th>year</th>
          <th>Investment value </th>
          <th>Interest (year)</th>
          <th>Total Interest</th>
          <th>Investment Capital </th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          // caculate the total interest erned in a given year
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Results;

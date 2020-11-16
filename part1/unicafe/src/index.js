import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  const {text, value} = props
  return <p>{text}{value}</p>
 }

const Button = (props) => {
  const {handleClick, type} = props
  return <button onClick={handleClick}>{type}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Math operations saved in var
  const all = good + neutral + bad;
  const average = (good + (-bad))/(good + neutral + bad);
  const positive = ((good / (good + neutral + bad)) * 100);

  // handle button/click events
  const setGoodValue = () => setGood(good + 1)
  const setNeutralValue = () => setNeutral(neutral + 1)
  const setBadValue = () => setBad(bad + 1)

  // debugging
  console.log("Good count:", good)
  console.log("Neutral count:", neutral)
  console.log("Bad count:", bad)  
  console.log("All", all)
  console.log("Average", average)
  console.log("Positive Feedback %", positive)

  return (
    <div>
      <h1>give feedback</h1>
        <Button type="good" handleClick={setGoodValue}/>
        <Button type="neutral" handleClick={setNeutralValue}/>
        <Button type="bad" handleClick={setBadValue}/>
      <h1>statistics</h1>
      {good+neutral+bad===0 ? <p>No feedback given</p> : 
        <table >
          <tbody>
            <tr>
              <td><Statistic text="good"/></td>
              <td><Statistic value={good}/></td>
            </tr>
            <tr>
              <td><Statistic text="neutral"/></td>
              <td><Statistic value={neutral}/></td>
            </tr>
            <tr>
              <td><Statistic text="bad"/></td>
              <td><Statistic value={bad}/></td>
            </tr>
            <tr>
              <td><Statistic text="all"/></td>
              <td><Statistic value={all}/></td>
            </tr>
            <tr>
              <td><Statistic text="average"/></td>
              <td><Statistic value={average}/></td>
            </tr>
            <tr>
              <td><Statistic text="positive"/></td>
              <td><Statistic value={positive + "%"}/></td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) =>{
  
  
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )

} 

const StatisticLine = (props) => {
  let value = props.value;

  return (
    <div>
      <p>{value} </p>
    </div>
  )
}

 const Statistics = (props) => {
    let good = props.good;
    let neutral = props.neutral;
    let bad = props.bad;

    const countAverage = () => {
      console.log("countaverage");
      return (((good - bad) / (good + neutral + bad)).toFixed(2))
    }
  
    const countPositive = () => {
      console.log("countPositive");
      return (
        ((good / (good + bad + neutral)) * 100).toFixed(2) + " %"
      )
      
    }

    return(
      <div>
          <table>
            <tbody>
              <tr>
                <td>good</td>
                <td><StatisticLine value = {good}/></td>
              </tr>
              <tr>
                <td>neutral</td>
                <td><StatisticLine value = {neutral}/></td>
              </tr>
              <tr>
                <td>bad</td>
                <td><StatisticLine value = {bad}/></td>
              </tr>
              <tr>
                <td>all</td>
                <td><StatisticLine value = {good + neutral + bad}/></td>
              </tr>
              <tr>
                <td>average</td>
                <td><StatisticLine value = {countAverage()}/></td>
              </tr>
              <tr>
                <td>positive</td>
                <td><StatisticLine value = {countPositive()}/></td>
              </tr>
            </tbody>
          </table>

      </div>
    )

} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
  }



  return (
    <div>
      <div>
        <h2>give feedback</h2>
      </div>
      <div>
        <Button handleClick = {handleGoodClick} text="good"/>
        <Button handleClick = {handleNeutralClick} text = "neutral"/>
        <Button handleClick = {handleBadClick} text = "bad"/>
      </div>
      <div>
        <h2>statistics</h2>
      </div>
      <div>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
      </div>
    </div>
  )
}


ReactDOM.render(<App />,document.getElementById('root'));


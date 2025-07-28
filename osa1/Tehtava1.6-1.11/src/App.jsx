import { useState } from 'react'

const Header = ({text}) => {
  console.log('Header part')
  return <h1>{text}</h1>
}

const StatisticLine = ({text, value}) => {
  console.log('StatisticLine part')
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}


const Button = ({onClick, text}) => {
  console.log('Button part')
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = (good - bad) / (total || 1)
    const positive = (good / (total || 1)) * 100

  return (
    <div>
      <Header text="Statistics" />
      {total === 0? (
        <p>No feedback given</p>
      ):(

        <div>
          <StatisticLine text= "Good" value={good} />
          <StatisticLine text= "Neutral" value={neutral} />
          <StatisticLine text= "Bad" value={bad} />
          <StatisticLine text= "All" value={total} />
          <StatisticLine text= "Average:" value={average.toFixed(1)} />
          <StatisticLine text= "Positive:" value={positive.toFixed(1) + '%'} />
          </div>
      )}
      </div>
    )
}


const App = () => {

  console.log('Alustetaan constit')
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  console.log('Lisätään tiedot')
  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick= {() => setGood(good + 1)} text="good" />
      <Button onClick= {() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick= {() => setBad(bad + 1)} text ="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>      
  ) 
}


export default App

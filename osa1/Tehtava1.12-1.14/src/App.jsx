import { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => { 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random()* anecdotes.length)
    setSelected(randomAnecdote)
  }

  const countVoting = () => {
    const vote = [... votes]
    vote[selected] += 1
    setVotes(vote)
  }

  const maxVotes = Math.max(...votes)
  const mostVotedAnecdote = votes.indexOf(maxVotes)

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button onClick={countVoting} text={"Vote"} />
      <Button onClick={nextAnecdote} text={"Next anecdote"} />

      <Header text={"Anecdote with most votes"} />
      {maxVotes > 0 ? (
        <>
          <p>{anecdotes[mostVotedAnecdote]}</p>
          <p>has {maxVotes} votes</p>
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App
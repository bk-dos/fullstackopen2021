import React, { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    //<div>
      <button onClick={onClick}>
        {text}
      </button>
    //</div>
  )
}

const Anecdote = ({header, text, point}) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>{text}</p>
      <p>has {point} votes</p>
    </div>
  )
}

const App = () => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const handleNext = () => {
    const randomInt = getRandomInt(0, 7)
    setSelected(randomInt)
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  
  let top
  let isTop
  for (let i = 0; i < 7; i++) {
    isTop = true
    for (let j = 0; j < 7; j++) {
      if (points[i] < points[j]) {
        isTop = false
        break
      }
    }
    if (isTop) top = i
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" text={anecdotes[selected]} point={points[selected]} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleNext} />
      <Anecdote header="Anecdote with most views" text={anecdotes[top]} point={points[top]} />
    </div>
  )
}

export default App
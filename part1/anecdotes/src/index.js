import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleEvent, text}) => {
  return(
    <button onClick={handleEvent}>{text}</button>
  )
}

const Anecdote = (props) => {
  const {header, points, index} = props
  return (
    <div>
      <h1>{header}</h1>
      {anecdotes[index]}
      <p>has {points[index]} votes</p>
    </div>

  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0)) // new way of filling an array with 0's of arbritary length in ES6
  
  const mostVotes = points.indexOf(Math.max(...points))

  // debugging
  console.log("points:", points)
  console.log("selected value:", selected)

  // generate random number between min, max 
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  } 

  // handle events
  const handleSelected = () => {
    setSelected(getRandomInt(0,6))
  }
  const handlePoints = () => {
    const copy = [...points] 
    copy[selected] +=1
    setPoints(copy)
  }
 
  return(
    <div>

      <Anecdote header={"Anecdote of the day"} index={selected} points={points}/>
      <Button handleEvent={handlePoints} text="vote"/>
      <Button handleEvent={handleSelected} text="next anecdote"/>
      <Anecdote header={"Anecdote with most votes"} index={mostVotes} points={points}/>
      
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>,
  document.getElementById('root')
);

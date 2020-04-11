import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const changeAnecdote = () => {
  let number = (Math.random() * anecdotes.length);
  number = Math.floor(number);
  return number;
}



const Button = (props) => {

  return(
    <div>
      <button onClick = {props.whenclick}>{props.text}</button>
    </div>
  )
}




const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [list, setList] = useState(new Array(anecdotes.length).fill(0))

  const voteFor = () => {
    let copy = [...list];
    copy[selected] += 1;
    setList(copy);
    console.log(list[0] + " " + list[1] + " " + list[2] +" " + list[3] + " " + list[4] + " " + list[5])
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {list[selected]} votes</p>
      <Button whenclick = {voteFor} text = {"vote"}/>
      <Button whenclick = {() => setSelected(changeAnecdote())} text = {"next anecdote"}/>
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

/* const votes = new Array(anecdotes.length).fill(0); */

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

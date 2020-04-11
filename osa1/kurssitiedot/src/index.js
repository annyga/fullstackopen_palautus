import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {

  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>{props.osa.name} {props.osa.excercises} </p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part osa = {props.kurssi.parts[0]}/>
      <Part osa = {props.kurssi.parts[1]}/>
      <Part osa = {props.kurssi.parts[2]}/>

    </div>
  
  )
}

const Total = (props) => {

  return (
    <div>
      <p>Number of excercises: {props.kurssi.parts[0].excercises + props.kurssi.parts[1].excercises
      + props.kurssi.parts[2].excercises}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half stack application developement',
    parts: [
    {
    name: 'Fundamentals of React',
    excercises: 10
  },

  {
    name: 'Using props to pass data',
    excercises: 7
  },

  {
    name: 'State of a component',
    excercises: 14
  }
  ]
  }


  return (
    <div>
      <Header kurssi = {course.name}/>
      <Content kurssi = {course}/>
      <Total kurssi = {course}/>
    </div>
  )
}


ReactDOM.render(<App />,document.getElementById('root'));


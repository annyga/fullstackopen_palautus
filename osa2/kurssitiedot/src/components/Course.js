import React from 'react'; 

const Course = (props) =>{
    const course = props.course;
    return(
      <div>
        <Header course = {course}/>
        <Content course = {course}/>
      </div>
    )
  }
  
  const Header = (props) => {
    const course = props.course;
    return(
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    const course = props.course;
    return(
      <div>
          {course.parts.map( (item) => <Part key = {item.id} name = {item.name} exec = {item.exercises}/>  )}
          <p>Total of {course.parts.reduce( (result, item) => {
            return result + item.exercises
          } 
          ,0)} excercises</p>
      </div>
    )
  }
  
  const Part = (props) => {
    const name = props.name
    const exec = props.exec
    return(
      <div>
        <p>{name} {exec}</p>
      </div>
    )
  }

  export default Course
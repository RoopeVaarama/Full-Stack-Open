import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  console.log(props)
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props.parts)
  return(
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </div>
  )
}

function Part(props){
  console.log(props)
  return <p>{props.parts.name}: {props.parts.exercises}</p>;
}

const Total = (props) => {
  console.log(props)
  return(
  <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Footer = () => {
  return(
    <div>
      Created by: 
      <a href="https://github.com/RoopeVaarama">Roope Vaarama</a>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
    ]
  }

  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <Footer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
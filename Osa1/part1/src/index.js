import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return(
    <div>
      greeting app created by 
      <a href="https://github.com/RoopeVaarama">Roope Vaarama</a>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 15  
  return(
  <>
    <h1>Greeting</h1>
    <Hello name ="Roope" age="21"/>
    <Hello name ={nimi} age={ika}/>
    <Footer />
</>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
/*const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root'))*/
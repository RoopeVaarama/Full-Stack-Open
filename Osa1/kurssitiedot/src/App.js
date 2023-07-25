import React from 'react';

const Header = ({ name }) => {
    console.log(name)
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Content = ({ parts }) => {
    console.log(parts)
    return (
        <div>
            {parts.map((part, i) => {
                return <Part key={i} part={part} />
            })}
        </div>
    )
}

const Part = ({ part }) => {
    console.log(part)
    return <p>{part.name}: {part.exercises}</p>;
}

const Total = ({ parts }) => {
    console.log(parts)
    let number = 0;
    parts.forEach(part => {
        console.log(part.exercises)
        number += part.exercises
    })
    return (
        <p>Number of exercises: {number}</p>
    )
}

const Footer = () => {
    return (
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
            }]
    };



    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            <Footer />
        </div>
    )
}

export default App;
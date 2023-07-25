import React, { useState } from 'react';

const Header = () => {
    return (
        <div>
            <h1>Unicafe: Feedback Application</h1>
        </div>
    )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistic = ({ good, neutral, bad }) => {
    let All = (good + neutral + bad)
    let Average = ((good - bad) / All).toFixed(1)
    let Positive = (good / All * 100).toFixed(1) + '%'

    if (All === 0) {
        return (
            <div>
                <p>No Feedback Given</p>
            </div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <StatisticLine text="Good: " value={good} />
                    <StatisticLine text="Neutral: " value={neutral} />
                    <StatisticLine text="Bad: " value={bad} />
                    <StatisticLine text="All: " value={All} />
                    <StatisticLine text="Average: " value={Average} />
                    <StatisticLine text="Positive: " value={Positive} />
                </tbody>
            </table>
        )
    }
}

const Footer = () => {
    return (
        <div>
            <h1>
                Created by:
                <a href="https://github.com/RoopeVaarama">Roope Vaarama</a>
            </h1>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header />
            <button onClick={() => setGood(good + 1)}>
                good
            </button>
            <button onClick={() => setNeutral(neutral + 1)}>
                neutral
            </button>
            <button onClick={() => setBad(bad + 1)}>
                bad
            </button>
            <h1>Statistics</h1>
            <Statistic good={good} neutral={neutral} bad={bad} />
            <Footer />
        </div>
    )
}

export default App;
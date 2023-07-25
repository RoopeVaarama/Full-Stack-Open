import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
    const points = [0, 0, 0, 0, 0, 0];

    const [selected, setSelected] = useState(0);
    const [copy, setCopy] = useState([...points]);


    let randomNumber = [Math.floor(Math.random() * anecdotes.length)];
    console.log(randomNumber);
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote selected={selected} anecdotes={anecdotes} />
            <Vote copy={copy} selected={selected} />
            <button onClick={() => {
                const copy2 = [...copy]
                copy2[selected] += 1
                setCopy(copy2)
            }}>Vote</button>
            <button onClick={() => setSelected(randomNumber)}>Next anecdote</button>
            <TopVoted copy={copy} anecdotes={anecdotes} />
        </div>
    )
}




const Anecdote = ({ anecdotes, selected }) => {
    return (
        <div>
            <p>{anecdotes[selected]}</p>
        </div>
    )

}

const Vote = ({ copy, selected }) => {
    console.log(copy);
    return (
        <div>
            <p>has {copy[selected]} votes</p>
        </div>
    )

}
function indexOfMax(arr) {
    console.log(arr);
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i]
        }
    }
    console.log(maxIndex);
    return maxIndex;

}
const TopVoted = ({ anecdotes, copy }) => {
    console.log(copy);
    var high = indexOfMax(copy);
    console.log(high)
    if (copy[high] > 0) {
        return (
            <div>
                <h1>Anecdote with most votes</h1>
                <p>{anecdotes[high]}</p>
                <p>has {copy[high]} votes</p>
            </div>
        )
    }
    if (!high) {
        console.log(high)
        return (
            <div>
                <p></p>
            </div>
        )
    }
}
export default App;
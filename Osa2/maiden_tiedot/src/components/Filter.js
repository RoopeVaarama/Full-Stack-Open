import React from 'react';

const Filter = ({ filter, setFilter }) => {
    return (
        <div>Find countries <input value={filter} onChange={e => setFilter(e.target.value)}></input></div>
    )
}

export default Filter;
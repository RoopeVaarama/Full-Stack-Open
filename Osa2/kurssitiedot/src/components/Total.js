import React from 'react';

const Total = ({ parts }) => {
    const Total = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <div>
            <p>Total of {Total} exercises</p>
        </div>
    );
};

export default Total;
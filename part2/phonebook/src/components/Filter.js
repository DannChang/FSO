import React from 'react';

const Filter = ({ value, onChange }) => {
    return (
        <div>
            Filter shown with <input onChange={onChange} value={value}/>
        </div>
    );
};

export default Filter;
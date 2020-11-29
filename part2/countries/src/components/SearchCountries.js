import React from 'react';

const SearchCountries = ({onChange,value}) => {
    return (
        <div>
            find countries 
            <input onChange={onChange} value={value}/>
        </div>
    );
};

export default SearchCountries;

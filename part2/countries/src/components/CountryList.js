import React from 'react';
import ShowCountryInfo from './ShowCountryInfo';

const CountryList = ({country}) => {
    console.log("Country list: ", country);
    if (country.length > 10) {
      return <p>Too many matches, please enter more values</p>;
    } 
    else {
      return (
        <div>
            {country.map(country => 
                <ShowCountryInfo country={country} key={country.alpha2Code}/>
            )}
        </div>
      );
    };
  };

export default CountryList;

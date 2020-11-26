import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FilterCountry = ({onChange, value}) => {
  return (
    <div>
      find countries <input onChange={onChange} value={value}/>
    </div>
  )
}

const CountryList = ({countries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, please enter more values</p>;
  } 
  else {
    return (
      <div>
          {countries.map(country => 
            <p key={country.alpha2Code}>
              {country.name} 
            </p>
          )}
      </div>
    )
  }
}

const CountryInfo = ({countries}) => {
  
  return (
    <div>
      <h1>{countries.name}</h1>
      <p>Capital City: {countries.capital}</p>
      <p></p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  },[]);


  const handleInputChange = (event) => {
    console.log(event.target.value)
    event.preventDefault();
    setFilter(event.target.value)
  };

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div >
      <FilterCountry onChange={handleInputChange} value={filter}/> 
      <CountryList countries={filteredCountries}/>
    </div>
  );
}

export default App;

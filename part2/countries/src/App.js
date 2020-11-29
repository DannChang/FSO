import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import SearchCountries from './components/SearchCountries';



const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ chosenCountry, setChosenCountry ] = useState('')

  // search between States for matching country
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(chosenCountry.toLowerCase()));

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  },[]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setChosenCountry(event.target.value)
    console.log("Countries filtered in input:", chosenCountry)
  };

  return (
    <div >
      <SearchCountries onChange={handleInputChange} value={chosenCountry}/>
      <CountryList country={filteredCountries}/>
    </div>
  );
}

export default App;

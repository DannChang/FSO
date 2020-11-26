import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherInfo =({countries}) => {

};

const ShowCountryInfo = ({countries}) => {
  const [infoShown, setInfoShown] = useState(false)

  const handleShowInfo = () => {
    setInfoShown(!infoShown)
  }
  
  return(
    <div>
      <button onClick={handleShowInfo}>{infoShown ? 'hide' : 'show'} </button>
      {infoShown && <CountryInfo countries={countries}/>}
    </div>
  )
};

const CountryInfo = ({countries}) => {
  return (
    <div>
      {countries.map(country => 
        <div id={country.alpha3Code}> 
          <h2>{country.name}</h2>
          <p>
            Capital: {country.capital}
          </p>
          <p>
            Population: {country.population}
          </p>
          <h3>Spoken languages</h3>
          <ul key={country.alpha3Code}>
            {country.languages.map((lang) => (
              <li key={lang.iso639_1}>{lang.name}</li>
            ))}
          </ul>
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            style={{ maxWidth: 200, height: 'auto' }}
            />        
          <h3>Weather in {country.capital}</h3>
          {/* <WeatherInfo
        location={country.capital}
        countryCode={country.alpha2Code}
          /> */}
        </div>
      )}
    </div>
  );
};

const CountryList = ({countries}) => {
  console.log("Country list: ", countries)
  if (countries.length > 10) {
    return <p>Too many matches, please enter more values</p>;
  } 
  else if(countries.length === 1) {
    return (
      <CountryInfo countries={countries} />
    );
  }
  else {
    return (
      <div>
          {countries.map(country => 
            <p key={country.alpha2Code}>
              {country.name} <ShowCountryInfo countries={countries}/>
            </p>
          )}
      </div>
    );
  };
};



const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ chosenCountry, setChosenCountry ] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(chosenCountry.toLowerCase()));

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
    setChosenCountry(event.target.value)
    console.log("filter values corresponding to input:", chosenCountry)
  };

  

  return (
    <div >
      find countries <input onChange={handleInputChange} value={chosenCountry}/>
      <CountryList countries={filteredCountries}/>
    </div>
  );
}

export default App;

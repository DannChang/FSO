import React from 'react';
import WeatherInfo from './WeatherInfo';

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      <h3>Spoken languages</h3>
        <ul key={country.alpha3Code}>
          {country.languages.map(lang => (
            <li key={lang.iso639_1}>
              {lang.name}
            </li>
          ))}
        </ul>
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
        style={{maxWidth: 200, height: 'auto'}}
      />        
      <WeatherInfo location={country.capital}/>
    </div>
  );
};

export default CountryInfo;
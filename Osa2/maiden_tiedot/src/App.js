import React, { useState, useEffect } from 'react'
import axios from 'axios'

//All components left in the same file as separation was not required in the tasks

const SearchBar = ({ search, onChange }) => {
  return (
    <div id='search_bar'>
      Find countries: <input value={search} onChange={onChange} />
    </div>
  );
};

const Results = ({ results, searchChange }) => {
  if (results.length > 10) {
    return (
      <div id='results'>
        <p>Too many matches, specify with another filter</p>
      </div>
    );
  } else if (results.length === 1) {
    return (
      <div id='results'>
        <ResultWithInfo result={results[0]} />
      </div>
    );
  } else {
    return (
      <div id='results'>
        {results.map(result => 
          <Result 
            key={result.alpha3Code} 
            result={result}
            searchChange={searchChange}
          />
        )}
      </div>
    );
  }
};

const Result = ({ result, searchChange }) => {
  return (
    <div>
      <p>
        {result.name}
        <button onClick={() => searchChange(result)}>show</button>
      </p>
    </div>
  );
};

const ResultWithInfo = ({ result }) => {
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [wind, setWind] = useState({speed: '', direction: ''});
  const lat = result.latlng[0];
  const lng = result.latlng[1];
  const URL = 'http://www.7timer.info/bin/api.pl?lon=' + lng + '&lat=' + lat + '&product=civil&output=json&unit=metric';
  
  //lat and long are at from around the center of the selected country
  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setTemperature(response.data.dataseries[0].temp2m);
        setWeather(response.data.dataseries[0].weather);
        setWind(response.data.dataseries[0].wind10m);
      });
  }, []);

  return (
    <div>
      <h1>{result.name}</h1>
        Capital: {result.capital}
      <br />
        Population: {result.population}
      <h2>Languages</h2>
      <ul id='languages'>
        {result.languages.map(language =>
          <Language key={language.name} language={language.name} />)
        }
      </ul>
      <div id='country_flag' style={{height:'150px', width:'150px'}}>
        <img src={result.flag} height='100%' alt='country flag'/>
      </div>
      <div id='weather_data'>
        <h2>Weather (takes a while to load)</h2>
        <p><b>Temperature:</b> {temperature} Celsius</p>
        <p><b>Weather:</b> {weather}</p>
        <p><b>Wind:</b> {wind.speed} km/h, direction: {wind.direction}</p>
      </div>
    </div>
  );
};

const Language = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  );
};

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResults(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    filterResults(event.target.value);
  };

  const filterResults = (filter) => {
    setFilteredResults(
      results.filter(result =>
        result.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  //must be a better way to do this
  const buttonSearchChange = (result) => {
    setNewSearch(result.name);
    filterResults(result.name);
  };

  return (
    <div id='app'>
      <SearchBar search={newSearch} onChange={handleSearchChange} />
      <Results results={filteredResults} searchChange={buttonSearchChange}/>
    </div>
  )
};

export default App;
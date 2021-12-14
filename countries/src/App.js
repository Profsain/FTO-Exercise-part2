import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowResult from './components/ShowResult';
import CountryDetails from './components/CountryDetails';

const App = () => {
  //App state
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [currentCountry, setcurrentCountry] = useState({})
  const [showComponent, setShowComponent] = useState(true)
  
  useEffect(() => {
    console.log('useEffect initiate')
    axios
      .get('https://restcountries.com/v2/all?fields=name,capital,population,flag,languages')
      .then(response => {
        console.log('Promise fulfilled.')
        setCountries(response.data)
      })
  }, [])

  //Handlers function
  const handleNameSearch = (event) => {
    setSearchName(event.target.value)
    setShowComponent(true)
  }
  const handleShowBtn = (countryObj) => {
    setcurrentCountry(countryObj)
    setShowComponent(false)
  }
  //filter the countries base on searchName input
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchName.toLowerCase()))
  
  //switch between component logic
  const showComponentUI = showComponent
    ? <ShowResult
          filteredCountries={filteredCountries}
          searchName={searchName}
          handleShowBtn={handleShowBtn}

    />
    : <CountryDetails
      name={currentCountry.name}
      capital={currentCountry.capital}
      population={currentCountry.population}
      language={currentCountry.languages}
      flag={currentCountry.flag}
    />
  
  return (
      <div>
        <div>
          <h1>World Countries</h1>
          Find countries <input
            value={searchName}
            onChange={handleNameSearch}
          />
        </div>
        {/* switch between component to show */}
        {showComponentUI}
      </div>
    ) 
}
export default App
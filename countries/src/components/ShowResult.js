import React from "react";
import CountryDetails from "./CountryDetails"

//Show result component
const ShowResult = ({ searchName, filteredCountries, handleShowBtn}) => {
  let errorMessage = ''
  
  if (searchName === '') {
    return <p>{errorMessage}</p>
  } else if (filteredCountries.length === 1) {

    const info = filteredCountries[0]
    
    return (
      <div>
        <CountryDetails
          name={info.name}
          capital={info.capital}
          population={info.population}
          language={info.languages}
          flag={info.flag}
        />
      </div>
    )
   }
  else if (filteredCountries.length > 10) {
    errorMessage = 'Too many matchs. Specify another filter'
    return <p>{ errorMessage}</p>
  } else {
    return filteredCountries.map(country => {
      return (
        <p>
          {country.name} <span>
            <button onClick={() => handleShowBtn(country)}>Show</button>
          </span>
        </p>
      )
    })
    }
  }
export default ShowResult
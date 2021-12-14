import React, {useState, useEffect} from "react";
import axios from "axios";
import Weather from "../Weather";

//single country component
const CountryDetails = ({ name, capital, population, flag, language}) => {
  const [weather, setWeather] = useState({})
 
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: capital
    }

    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(respons => {
        setWeather({
          temp: respons.data.current.temperature,
          wind: respons.data.current.wind_speed,
          dir: respons.data.current.wind_dir,
          img: respons.data.current.weather_icons[0],
          desc: respons.data.current.weather_descriptions[0]
        })
      })
  }, [])
  
  const languages = language.map(lang => <li>{ lang.name}</li>)  
    return (
      <div>
        <h2>{name}</h2>
        <p>Capital {capital}</p>
        <p>Population {population}</p>
        <h4>Spoken Languages</h4>
        <ul>{ languages}</ul>
        <img src={flag} alt={name} style={{ "width": 200, "height": 200 }} />

        <p>The Temperature: {weather.temp}</p>
        <Weather
          city={capital}
          temp={weather.temp}
          img={weather.img}
          desc={weather.desc}
          wind={weather.wind}
          dir={weather.dir}
        />
      </div>
    )
}
export default CountryDetails
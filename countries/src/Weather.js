import React from "react";

//weather component
const Weather = ({ city, temp, wind, img, dir, desc}) => {
  return (
    <div>
        <h2>Weather in {city}</h2>
        <p><strong>Temperature</strong> {temp}° Celcius</p>
        <img src={img} alt={city} style={{ "width": 200, "height": 200 }} />
          <h4>Description: { desc}</h4> 
        <p><strong>Wind</strong> {wind} mph direction <strong>{ dir}</strong></p>
    </div>
  )
}
export default Weather
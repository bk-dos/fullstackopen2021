import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('')
  //const [countries, setCountries] = useState([])
  const [content, setContent] = useState('')

  const searchHandler = (event) => {
    setSearchText(event.target.value)
  }

  const showHandler = countryName => {
    setSearchText(countryName)
  }

  const wind_dir_generator = (degree) => {
    let dir = ""
    if (degree === 0 || (0 < degree && degree < 11.25)) {
      //console.log("NNN")
      //console.log(degree === 0)
      //console.log(0 < degree < 11.25)
      dir = "N"
    } else if (degree < 33.75) {
      dir = "NNE"
    } else if (degree < 56.25) {
      dir = "NE"
    } else if (degree < 78.75) {
      dir = "ENE"
    } else if (degree < 101.25) {
      dir = "E"
    } else if (degree < 123.25) {
      dir = "ESE"
    } else if (degree < 146.25) {
      dir = "SE"
    } else if (degree < 168.75) {
      dir = "SSE"
    } else if (degree < 191.25) {
      dir = "S"
    } else if (degree < 213.75) {
      dir = "SSW"
    } else if (degree < 236.25) {
      dir = "SW"
    } else if (degree < 258.75) {
      dir = "WSW"
    } else if (degree < 281.25) {
      dir = "W"
    } else if (degree < 303.75) {
      dir = "WNW"
    } else if (degree < 326.25) {
      dir = "NW"
    } else if (degree < 348.75) {
      dir = "NNW"
    } else if (degree <= 360) {
      dir = "N"
    } 
    return dir
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        //console.log(response)

        const matchedCountries = response.data
          .filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))
        
          if (matchedCountries.length === 1) {
          const api_key = process.env.REACT_APP_API_KEY

          let temperature
          let icon
          let wind_speed
          let wind_dir

          axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${matchedCountries[0].capital}&units=metric&appid=${api_key}`)
              .then(response => {
                //console.log(response)
                //console.log(response.data.wind.deg)
                //console.log(wind_dir_generator(response.data.wind.deg))
                //console.log(typeof(response.data.wind.deg))
                temperature = response.data.main.temp
                icon = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                wind_speed = response.data.wind.speed
                wind_dir = wind_dir_generator(response.data.wind.deg)
                //console.log({temperature, icon, wind_speed, wind_dir})
                setContent(
                  <>
                  <h2>{matchedCountries[0].name.common}</h2>
                  <p>capital {matchedCountries[0].capital}</p>
                  <p>population {matchedCountries[0].population}</p>
                  <h3>Spoken languages</h3>
                  {Object.entries(matchedCountries[0].languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)}
                  <img src={matchedCountries[0].flags.svg} alt="Flag" width="200" height="200"></img>
                  <h2>Weather in {matchedCountries[0].capital}</h2>
                  <h3>temperature: {temperature} celsius</h3>
                  <img src={icon} alt="weather icon"></img>
                  <h3>wind: {wind_speed}m/sec direction {wind_dir}</h3>
                  </>
                )
              })
        } else if (matchedCountries.length > 10) {
          setContent(<p>Too many matches, specify another filter</p>)
        } else {
          const countryNames = matchedCountries.map(country => country.name.common).sort()
          setContent(countryNames.map(countryName => <p key={countryName}>{countryName}<button onClick={() => showHandler(countryName)}>show</button></p>))
        } 
      })
  }, [searchText])

  
  

  return (
    <div>
      find countries: <input onChange={searchHandler} value={searchText}/>
      {content}
    </div>
  );
}

export default App;

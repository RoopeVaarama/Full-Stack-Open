
import { useEffect, useState } from "react";
import weatherService from "../services/weather";
const Country = ({ country }) => {
    console.log(country)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area}</div>
            <Languages languages={country.languages} />
            <img src={country.flags.svg} alt="flag" width="200" />
            <Weather capital={country.capital[0]} />
        </div>
    )
}

const Languages = ({ languages }) => {
    console.log(languages)
    return (
        <div>
            <h3>Spoken languages</h3>
            <ul>
                {Object.keys(languages).map(language => {
                    console.log(language)
                    return (
                        <li key={language}>{languages[language]}</li>
                    )
                })}
            </ul>
        </div>
    )
}

const Weather = ({ capital }) => {
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <WeatherData capital={capital} />
        </div>
    )
}

const WeatherData = ({ capital }) => {
    //https://api.openweathermap.org/data/2.5/weather?q=London
    //Fetch data from the API
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        weatherService.getOne(capital).then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
        })
    }, [])

    console.log(weather)
    return (
        <div>
            <div>temperature: {weather ? weather.main.temp : ""} Celsius</div>
            {weather ? <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" /> : null}
            <div>wind: {weather ? weather.wind.speed : ""} m/s</div>
        </div>
    )
}

const Countries = ({ countries, filter, setFilter }) => {
    if (!countries) return null
    console.log(countries)
    return (
        <div>
            {countries.filter(country => country.name.common.toLowerCase().includes(filter?.toLowerCase())).length > 10 ?
                <div>Too many matches, specify another filter</div> :
                countries.filter(country => country.name.common.toLowerCase().includes(filter?.toLowerCase())).length === 1 ?
                    <Country country={countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))[0]} /> :
                    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())).map(country =>
                        <div key={country.name.common}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button></div>
                    )
            }
        </div>
    )
}
export default Countries;
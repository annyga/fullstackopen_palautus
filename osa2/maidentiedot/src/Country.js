import React, { useState, useEffect } from 'react';
import axios from "axios";


const Country = (props) =>{

    const capital = props.country.capital;
    const [capitalTemp, setTemp] = useState(0);
    const [capitalWind, setCapitalWind] = useState(0);
    const api_key = process.env.REACT_APP_API_KEY
    
    useEffect( () => {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+ capital +"&units=metric&appid=" + api_key)
        .then( (response) => {
            setTemp(response.data.main.temp);
            setCapitalWind(response.data.wind.speed);
        })
        .catch( (error) => {
            console.log(error.message);
        })

    })

    return(
        <div>
                <h2>{props.country.name}</h2>
                <p>capital {props.country.capital}</p>
                <p>population {props.country.population}</p>
                <h3>languages</h3>
                <ul>
                    {props.country.languages.map( (lang) => {
                        return(
                            <li key = {lang.name}>{lang.name}</li>
                        )
                    } )}
                </ul>
                <img width = "100px" src = {props.country.flag} />
                <h3>Weather in {props.country.capital}</h3>
                <p>temperature: {capitalTemp} Celsius</p>
                <p>Wind: {capitalWind} m/s</p>
        </div>
    )
}

export default Country;
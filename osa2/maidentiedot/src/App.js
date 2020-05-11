import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Search from "./Search.js";


const App = () => {

    const [countries, setCountries] = useState([]);
    const [searchResults, setResults] = useState([]);

    useEffect( () => {

        axios.get("https://restcountries.eu/rest/v2/all")
        .then( (response) => {
            setCountries(response.data);
        })
    }, [] )

    const handleInputChange = (event) => {
        let temp = countries.filter( (item) => {
            return (item.name.toLowerCase().indexOf(event.target.value) !== -1)
        })
        setResults(temp);

    }



    return(
        <div>
            find countries <input onChange = {handleInputChange}/>
            <Search list = {searchResults}/>
        </div>
    )
    }
export default App;
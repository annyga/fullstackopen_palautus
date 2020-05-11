import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Country from "./Country";

const Search = (props) => {

    const [chosen, setChosen] = useState("");

    const displayCountry = (event) => {
        setChosen(event.currentTarget.name);
    }

    if (props.list.length > 10) {
        return (<div>
            <p>too many countries</p>
        </div>)
    }else if (props.list.length < 10 && props.list.length > 1){
            let i;
            for (i of props.list){
                if (chosen === i.name){
                    return(
                        <div>
                            <Country country={i}/>
                        </div>
                    )
                }
            }

            return (
                <div>
                    {props.list.map( (item) => (
                        <div  key = {item.name}>                       
                    <p>{item.name}<button name={item.name} onClick={displayCountry}>show</button></p>
                        </div>
                )
                )}
                </div>
                )


    }else if (props.list.length === 1){
        return(
            <div>
                <Country country = {props.list[0]}/>
            </div>
        )
    }else{
        return(
            <div>

            </div>
        )
    }

}

export default Search;
import React, { useState, useEffect } from 'react'
import axios from "axios"
import noteService from "./services/notes.js";
import Notification from "./services/Notification";

const Filter = (props) => {
  
  return(
    <div>
      filter shown with a: <input onChange={props.meth}/>
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <div>
      <form>
        <div>
          name: <input id="nameinput" onChange = {props.handlechange}/>
          </div>
          <div> 
          number: <input id="numberinput" onChange = {props.handlenumChange}/>
          </div> 
        <div>
          <button type="submit" onClick = {props.logname}>add</button>
        </div>
      </form>
    </div>
  )
}

const Person = (props) => {




  return(
      <div>      
      <li>{props.name} {props.number} <button name = {props.id} onClick = {props.removePerson}>delete</button></li>
      </div>
  )
}

const PersonsList = (props) => {


  return (
    <div>
      <ul>
        {props.daList.map( (item) => 
          <Person key = {item.id} name={item.name} number={item.number} id={item.id} removePerson = {props.removePerson}/>
           )}
      </ul>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]); 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNumber] = useState('')
  const [word, setWord] = useState('')
  const [message, setMessage] = useState(null);
  const [klass, setKlass] = useState("msg");
 
  useEffect( () => {
    noteService.getAll()
    .then( response => {
      setPersons(response.data)
    })
  }, [])

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) =>{
    setNumber(event.target.value);
  }

  const handleWordChange = (event) => {
    setWord(event.target.value);
  }
  //function checking if any names include the word in the search input and returnig a list with the names
  const namesThatFit = persons.filter( (item) =>
  item.name.toLowerCase().includes(word) )


  //function for adding a new person
  const logName = (event) => {
    event.preventDefault();
    let pers = {name: newName, number: newNumber};
    let isInList = false;
    let idNum;

    for (let item of persons){
      console.log(item.name === pers.name)
      if (item.name === pers.name){
        isInList = true;
        idNum = item.id;
        pers = {name:item.name, number: newNumber};
        break;                    
      }
    }
    //if it is a new person
    if (!isInList){
      noteService.create(pers)
      .then( (response) => {
        console.log(response)
        setPersons(persons.concat(response.data));
        setMessage("added " + pers.name);
        document.getElementById('nameinput').value = "";
        document.getElementById('numberinput').value = "";
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } )
      .catch( (error) => {
        console.log(error.message);
      })
      
      
      //this is for updating person
    }else if(isInList){
      if (window.confirm("Do you want to update this person?")){
        noteService.modify(idNum, pers)
        .then( (response) => {
          console.log(response.data)
          noteService.getAll()
          .then( (response) => {
            setPersons(response.data);
            setMessage("updated " + pers.name);
            document.getElementById('nameinput').value = "";
            document.getElementById('numberinput').value = "";
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch( (error) => {
            console.log("couldnt setpersons:" + error)
          })
        })
        .catch( (error) => {
          console.log(error.message)
          setKlass("negmsg");
          setMessage(`information of ${pers.name} was already removed from server`);
          document.getElementById('nameinput').value = "";
          document.getElementById('numberinput').value = "";
          setTimeout(() => {
            setMessage(null);
            setKlass("msg");
          }, 5000);
          setPersons(persons.filter( (person) => {
            return (person.id != pers.id); 
          }))
        })
      }else{
        console.log("no updating")
        document.getElementById('nameinput').value = "";
        document.getElementById('numberinput').value = "";
      }
    }

    setNewName('');
    setNumber('');

  }
//function for removing
  const removePerson = (event) => {
    let personId = event.target.name
    if (window.confirm("are you sure?")) {
      noteService.remove(personId)
      .then( (response) => {
        console.log(response)
        setPersons(persons.filter( (gubbe) => {
          return (gubbe.id != personId);
        } ))
        setMessage("Succesfully removed person");
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      } )
      .catch( (error) => {
        console.log("fail:" + error);
      })
    }else{
      console.log("no deleting");
    }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} klass={klass}/>
      <div>
        <Filter meth = {handleWordChange}/>
      </div>
      <h2>Add a new</h2>
        <PersonForm handlechange = {handleChange} handlenumChange = {handleNumChange} logname = {logName}/>
      <h2>Numbers</h2>
        <PersonsList daList = {namesThatFit} removePerson = {removePerson}/>
    </div>
  )

}

export default App

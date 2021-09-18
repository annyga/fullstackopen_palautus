import React, {useState} from 'react'
import {ALL_AUTHORS, CHANGE_BIRTHYEAR} from '../queries'
import { useQuery, useMutation } from '@apollo/client'

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  const [editYear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]})

  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  


  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = [...result.data.allAuthors]

  const changeBirthYear = (event) => {
    event.preventDefault()
    let setBornTo = parseInt(year)

    let foundAuthor = authors.find( (item) => {
      return item.name === name
    })
    try{
      editYear({variables : {id: foundAuthor.id, setBornTo}})
    }catch(error){
      console.log(error);
    }
    

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <h2>Set birthyear</h2>
      <form onSubmit={changeBirthYear}>
        <select value={name} onChange={ ({target}) => setName(target.value)}>
          {authors.map( a => 
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <br/>
        born<input type="number" value={year} onChange={ ({target}) => {setYear(target.value)}}/>
        <br/>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
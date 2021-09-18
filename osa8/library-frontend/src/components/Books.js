
import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [chosenGenre, setChosenGenre] = useState('all');

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = [...result.data.allBooks]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            {
              if(a.genres.includes(chosenGenre) || chosenGenre === 'all') {
                return (
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr> )
              }else{
                return null
              }             

            }              


          )}
        </tbody>
      </table>
      <button onClick={ () => setChosenGenre('thriller')}>thriller</button>
      <button onClick={ () => setChosenGenre('drama')}>drama</button>
      <button onClick={ () => setChosenGenre('comedy')}>comedy</button>
      <button onClick={ () => setChosenGenre('romance')}>romance</button>
      <button onClick={ () => setChosenGenre('war')}>war</button>
      <button onClick={ () => setChosenGenre('all')}>all</button>
    </div>
  )
}

export default Books
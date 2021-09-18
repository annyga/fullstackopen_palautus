import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Recommend = (props) => {

    const result = useQuery(ALL_BOOKS)
    const [chosenGenre, setChosenGenre] = useState('');

    useEffect( () => {
        const genre = localStorage.getItem('user-genre');
        setChosenGenre(genre);
        
    })

  
    if (!props.show) {
      return null
    }
  
    if (result.loading)  {
      return <div>loading...</div>
    }
  
    const books = [...result.data.allBooks]
  
    return (
      <div>
        <h2>books in youre favorite genre {chosenGenre}</h2>
  
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
      </div>
    )
}


export default Recommend
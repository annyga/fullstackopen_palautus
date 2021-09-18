import React, { useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ADD_AUTHOR} from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [tpublished, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, {query: ALL_AUTHORS} ]})

  const [addAuthor, {data, loading, error}] = useMutation(ADD_AUTHOR, {onCompleted(addAuthor){
    const published = parseInt(tpublished)
    createBook({variables: { title, author: addAuthor.addAuthor.id, published, genres}})
    
    setTitle('')
    setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }});

  const result = useQuery(ALL_AUTHORS)
  

  if (!props.show) {
    return null
  }


  const authors = [...result.data.allAuthors]
  

  const submit = async (event) => {
    event.preventDefault()
    const published = parseInt(tpublished)

    let authorExists = authors.find( (item) => {
      return item.name === author
    })

    
    
    if(authorExists){
      
      let writer = authorExists.id
      createBook({variables: { title, author: writer, published, genres}})
    
      setTitle('')
      setPublished(0)
      setAuthor('')
      setGenres([])
      setGenre('')
      authorExists = null
    }else{
      // if author doesn´t exist.
      await addAuthor({variables:{name: author}});
   

      

/*       let authorExists = authors.find( (item) => {
        return item.name === author
      })

      createBook({variables: { title, author: authorExists.id, published, genres}})

      setTitle('')
      setPublished(0)
      setAuthor('')
      setGenres([])
      setGenre('') */
    }

  }

    
    


  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={tpublished}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook

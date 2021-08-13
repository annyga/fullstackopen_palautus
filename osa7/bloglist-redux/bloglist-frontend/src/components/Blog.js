import React, {useState} from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setMessage, setEmptyMessage } from '../reducers/noteReducer'
import {Link} from 'react-router-dom'

const Blog = ({blog, user, setTheBlogs}) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const handleClick = () => {
    setShow(!show);
  }

  const likePost = async (event) => {


    const newBlog = {
      "title": blog.title,
        "author" : blog.author,
        "url" : blog.url,
        "likes": blog.likes + 1
    }

    await blogService.updateBlog(newBlog, blog.id)
    setTheBlogs()

   
  }

  const deletePost = async () => {
    //setMessage('Blogpost removed')
    dispatch(setMessage('Blogpost removed'))
    setTimeout( () => {
      //setMessage('')
      dispatch(setEmptyMessage())
    }, 5000)
    await blogService.removeBlog(blog.id)
    setTheBlogs()

  }

  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle ={
    background: "blue"
  }
  
  if(show){
    return(
      <div style={blogStyle}>
        <p>{blog.title} {blog.author} <button id='hideBlog' onClick={handleClick}>hide</button></p>
        <p>{blog.url}</p>
        <p id="likeCount">{blog.likes} <button id="likeBlog" onClick={likePost}>like</button></p>
        <p>{blog.user.nimi}</p>       
        {user.nimi === blog.user.nimi ? <button id="removeBlog" style={buttonStyle} onClick={deletePost}>remove</button> : null}
      </div> 
    )
  }

  return(

  <div style={blogStyle}>
    <Link to={'/blogs/' + blog.id}>{blog.title} {blog.author} </Link>
  </div>  
    )
  }
export default Blog
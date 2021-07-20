import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({blog, user, setTheBlogs, setMessage}) => {
  const [show, setShow] = useState(false)
  const [update, setUpdate] =useState(0) //use only for re-rendering component

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

    const updateThe = () => {
      let newup = update + 1
      setUpdate(newup)
    }

    updateThe()
   
  }

  const deletePost = async () => {
    setMessage('Blogpost removed')
    setTimeout( () => {
      setMessage('')
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
    <p className='blogTitle'>{blog.title} {blog.author} <button id="viewBlog" onClick={handleClick}>view</button> </p>
  </div>  
    )
  }
export default Blog
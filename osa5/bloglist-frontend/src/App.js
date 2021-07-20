
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Viesti from './components/Viesti'
import Form from './components/Form'
import CreateButton from './components/CreateButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')

    if(loggedInUser){
      let tempUser = JSON.parse(loggedInUser)

      setUser(tempUser)
    }
  }, [])
//Users
  const handleLogin = async(event) => {
    event.preventDefault()

    try{

      const retrievedUser = await login.loginUser(username, password)
      blogService.setToken(retrievedUser.token)
      setUser(retrievedUser)
      window.localStorage.setItem('loggedInUser', JSON.stringify(retrievedUser))
      
      setUsername('')
      setPassword('')

    }catch(error){
      console.log(error.message)
      setMessage("wrong username or password")
      setUsername('')
      setPassword('')
      
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }



  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
//Blogs

  const setTheBlogs = () =>{
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const createNewBlogPost = async (event) => {
    event.preventDefault()

    try{
      let newBlog = {
        "title": title,
        "author" :author,
        "url" : url,
        "likes": 0
      }
  
      await blogService.addNew(newBlog)
  
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ) 
  
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout( () => {
        setMessage(``)
      }, 5000)
  
      setTitle('')
      setAuthor('')
      setUrl('')

      setLoginVisible(!loginVisible)

    }catch(error){
      setMessage(`title or url missing`)
      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setMessage('')
      }, 5000);
    }
    

  } 



  if (user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <Viesti msg={message}/>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="submit" type="submit">login</button>
        </form> 
      </div> 
    )
  }

  return (
     <div> 
        <h2>blogs</h2>
        <Viesti msg={message}/>
        <p>{user.nimi} logged in <button onClick={logOutUser}>logout</button></p>
        <CreateButton loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
        <Form createNewBlogPost={createNewBlogPost} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
        <br/>     
        {blogs.sort((a, b) => {return b.likes - a.likes}).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setTheBlogs={setTheBlogs} setMessage={setMessage} />
        )}
      </div> 
  )
}

export default App
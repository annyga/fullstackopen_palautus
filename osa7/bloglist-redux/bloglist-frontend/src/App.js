
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Viesti from './components/Viesti'
import CreateButton from './components/CreateButton'
import Formi from './components/Formi'
import Users from './components/Users'
import User from './components/User'
import Blogview from './components/Blogview'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, setEmptyMessage } from './reducers/noteReducer'
import { setAllBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Form, FormGroup, Button } from 'react-bootstrap'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setAllBlogs ( blogs ))
    )  
  }, [])

  useEffect( () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')

    if(loggedInUser){
      let tempUser = JSON.parse(loggedInUser)

      dispatch(setUser(tempUser))
    }
  }, [])

  
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.users)
//Users
  const handleLogin = async(event) => {
    event.preventDefault()

    try{

      const retrievedUser = await login.loginUser(username, password)
      blogService.setToken(retrievedUser.token)
      dispatch(setUser(retrievedUser))
      window.localStorage.setItem('loggedInUser', JSON.stringify(retrievedUser))
      
      setUsername('')
      setPassword('')

    }catch(error){
      console.log(error.message)
      dispatch(setMessage("wrong username or password"))
      setUsername('')
      setPassword('')
      
      setTimeout(() => {
        dispatch(setEmptyMessage())
      }, 5000);
    }



  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
  }
//Blogs

  const setTheBlogs = () =>{
    blogService.getAll().then(blogs =>
      dispatch(setAllBlogs( blogs ))
    )
  }

  const createNewBlogPost = async (event) => {
    event.preventDefault()

    try{
      let newBlog = {
        "title": title,
        "author" :author,
        "url" : url,
        "likes": 0,
        "comments":[]
      }
  
      await blogService.addNew(newBlog)
  
      blogService.getAll().then(blogs =>
        dispatch(setAllBlogs( blogs ))
      ) 
  

      dispatch(setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      setTimeout( () => {
        dispatch(setEmptyMessage())
      }, 5000)
  
      setTitle('')
      setAuthor('')
      setUrl('')

      setLoginVisible(!loginVisible)

    }catch(error){

      dispatch(setMessage(`title or url missing`))
      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {

        dispatch(setEmptyMessage())
      }, 5000);
    }
    

  } 



  if (user === null){
    return(
      <div className='container'>
        <h2>Log in to application</h2>
        <Viesti />
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormGroup>
          <Button variant="primary" type="submit" id='submit'>
            login
          </Button>

        </Form>
      </div> 
    )
  }

  return (
    <div className='container'>
      <Router>
        <div> 
            <div>
              <Link to='/'>blogs</Link>
              <Link to='/users'>users</Link>
            </div>
            <h2>blogs</h2>
            <Viesti />
            <p>{user.nimi} logged in <Button variant='primary' onClick={logOutUser}>logout</Button></p>
        </div> 
        <Switch>
          <Route path='/users/:id'>
            <User/>
          </Route>
          <Route path='/users'>
            <Users/>
          </Route>
          <Route path='/blogs/:id'>
            <Blogview setTheBlogs={setTheBlogs}/>
          </Route>
          <Route path='/'>
            <CreateButton loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
            <Formi createNewBlogPost={createNewBlogPost} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
            <br/>     
            {blogs.sort((a, b) => {return b.likes - a.likes}).map(blog =>
              <Blog key={blog.id} blog={blog} user={user} setTheBlogs={setTheBlogs} />
            )}
          </Route>

        </Switch> 
      </Router>
    </div>
  )
}

export default App
import { useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import blogService from '../services/blogs'
import {useState} from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'



const Blogview = ({setTheBlogs}) => {

    const [comment, setComment] = useState('')


    const blogs = useSelector(state => state.blogs)

    const { id } = useParams()

    let blog = blogs.filter( item => item.id === id)
    

  
      
    const likePost = async () => {
        const newBlog = {
            "title": blog[0].title,
              "author" : blog[0].author,
              "url" : blog[0].url,
              "likes": blog[0].likes + 1
          }
      
          await blogService.updateBlog(newBlog, blog[0].id)
          
          setTheBlogs()
          
    }

    const addComment = async (event) => {
        event.preventDefault()

        await blogService.addCommentToBlog(comment, blog[0].id)
        
        setTheBlogs()

        setComment('')
    }

    

    if (blog.length === 0){
        return null
    }
    

    return (
        <div>
            <h2>{blog[0].title} by {blog[0].author}</h2>
            <a href={blog[0].url}>{blog[0].url}</a>
            <p id="likeCount">{blog[0].likes} likes <Button id="likeBlog" onClick={likePost}>like</Button></p>
            <p>added by {blog[0].user.nimi}</p> 
            <h3>comments</h3>
            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Control type="text" onChange={({target}) => {setComment(target.value)}} value={comment}/><Button type="submit">add comment</Button>
                </Form.Group>
            </Form>
            {blog[0].comments.length === 0 ? null : blog[0].comments.map( item => 
                <p key={item.id}>{item.text}</p>
            )}    
        </div>
    )
}


export default Blogview
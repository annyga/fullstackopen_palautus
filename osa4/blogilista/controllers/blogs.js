const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (req, res, next) => {

    try{
        const returnedBlogs = await Blog.find({}).populate('user', { tunnus: 1, nimi: 1 })

        res.json(returnedBlogs.map(item => item.toJSON()))
    }catch(error){
        next(error)
    }


    }
)


blogsRouter.post('/', middleware.userExtractor, async(req, res, next) => {

    try{
        const body = req.body;

        const decodedToken = jwt.verify(req.token, process.env.SECRET)
    
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token on väärä, tai se puuttuu' })
          }
    
        const user = req.user
        
        const blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes ? req.body.likes : 0,
            user : user._id
    
        })
        
        if(blog.title === '' || blog.url === ''){
            res.sendStatus(400).end()
        }else{
            savedBlog = await blog.save()
            
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            res.json(savedBlog.toJSON())
            
        }
    }catch(error){
        next(error)
    }



})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {

    try{
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
    
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'Token on väärä, tai se puuttuu' })
          }
    
        const idd = req.params.id;
    
        const blogToRemove = await Blog.findById(idd)
          
        if(blogToRemove.user.toString() !== req.user._id.toString()){
            res.sendStatus(400).end();
        }
        
        await Blog.findByIdAndRemove(idd)
        res.sendStatus(204).end();

    }catch(error){
         next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    const idd = req.params.id;

    let blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }
    try{
       let updatedBlog  = await Blog.findByIdAndUpdate(idd, blog, {new: true})
       res.json(updatedBlog);
       
    }catch(error){
        next(error)
    }
})

module.exports = blogsRouter;
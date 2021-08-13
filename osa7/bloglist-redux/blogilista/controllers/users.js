const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const Blog = require('../models/blog');


userRouter.get('/', async(req, res, next) => {
    
    try{
        const result = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})   
        res.json(result.map( item => item.toJSON()))
    }catch(error){
        next(error)
    }
    

})

userRouter.get('/:id', async (req, res, next) => {

    let id = req.params.id
    try{
        const result = await User.findById(id).populate('blogs', {title: 1})

        res.send(result)
        
    }catch(error){
        next(error)
    }
})

userRouter.post('/', async (req, res, next) => {

    try{
        const body = req.body

        if(body.tunnus.length < 3 || body.salasana.length < 3){
            res.status(400).send('too short tunnus or salasana')
        }else{
            const salt = 10
            const passWordHasch = await bcrypt.hash(body.salasana, salt)
    
            const user = new User({
                tunnus: body.tunnus,
                salasana: passWordHasch,
                nimi: body.nimi,
                blogs: []
            })
    
            const savedUser = await user.save()
    
            res.json(savedUser)
        }


    }catch(error){
        next(error)
    }
})

module.exports = userRouter;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(req, res, next) => {
    
    try{
        const body = req.body;

        const user = await User.findOne({tunnus: body.tunnus})
    
        const correctPassword = user === null ? false : await bcrypt.compare(body.salasana, user.salasana)
    
        if (!(user && correctPassword)) {
            return res.status(401).json({
              error: 'invalid username or password'
            })
          }
    
          const userForToken = {
            username: user.tunnus,
            id: user._id,
          }
        
          const token = jwt.sign(userForToken, process.env.SECRET)
        
          res
            .status(200)
            .send({ token, tunnus: user.tunnus, nimi: user.nimi })
    }catch(error){
        next(error)
    }

    
})

module.exports = loginRouter;
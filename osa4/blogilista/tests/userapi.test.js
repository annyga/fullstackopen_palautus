const { TestWatcher } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)


const users = [{
    tunnus: "mike",
    salasana: "$2b$10$aaPkYwd1/81eimziUqVzBOhFnMvvdFT5DKZbx8vCyBdAtVQOZxJUG",
    nimi: "Michael Knight"
    },
    {
    tunnus: "sepe",
    salasana: "$2b$10$BWP5AZDZb.qxoYwucp5GJO752LTgR5j1TaVxaG79qWQxwAvo4aZ3W",
    nimi: "Seppo Talasmaa"
    }]




describe('testing the user api', () => {

    beforeEach( async () => {
        await User.deleteMany({})
    })

    test('adding too short tunnus', async()=> {
        const newUser = {
            tunnus: "pe",
            salasana: "jupiter",
            nimi: "Jukka Poika"
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('adding too short salasana', async() => {
        const newUser = {
            tunnus: "pekka",
            salasana: "ju",
            nimi: "Jukka Poika"
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
    })

    

})

afterAll(() => {
    mongoose.connection.close()
  })
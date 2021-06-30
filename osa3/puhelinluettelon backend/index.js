
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const Person = require('./models/person');
const { response } = require('express');

const app = express();
app.use(cors());

morgan.token('reqbodyname', function (req, res) { 

    if(req.method === "POST"){
        return `{name: "${req.body.name}", number: "${req.body.number}" } `
    }else{
        return null;
    }
     


})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbodyname"));


app.use(express.json());



let personsList = []


app.get("/api/persons", (req, res, next) => {
    Person.find({}).then( persons => {
        personsList = [...persons]
        res.json(persons);
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
    
    Person.findById(req.params.id)
    .then( pers => res.json(pers))
    .catch(error => next(error))
})

app.get("/info", (req, res) => {

    Person.find({}).then( persons => {
        personsList = [...persons]
        let date = new Date()
        let msg = `<p>Phonebook has info for ${personsList.length} people</p><br><p>${date}<p/>`
        
        
        res.send(msg)
        
    })
    .catch(error => next(error))


})

app.post("/api/persons", (req, res, next) => {

    const body = req.body;

    if(body.name === undefined){
        return res.status(400).json({error: "name is missing"})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then( savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))

})


app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))

})

app.put("/api/persons/:id" , (req, res, next) => {

    let newMan = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(req.params.id, newMan, {new: true})
    .then(updatedPerson => res.json(updatedPerson))
    .catch( error => next(error))

    
})


const errorHandler = (error, req, res, next) => {

    if(error.name === "CastError"){
        return res.status(400).send({error: "Vääränlainen id"})
    }else if (error.name === "ValidationError"){
        return res.status(400).send({error: error.message})
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
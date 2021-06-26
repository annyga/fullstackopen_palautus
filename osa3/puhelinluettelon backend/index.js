
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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


morgan.token('type', function (req, res) { return req.headers['content-type'] })
let persons = [

    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
        
      },
      {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
        
      },
      {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
        
      },
      {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
        
      },
      {
        "id": 5,
        "name": "wer",
        "number": "868-9871117"
      }
]


app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    
    let pers = persons.find( item => item.id === Number(req.params.id))

    if(pers){
        res.json(pers)
    }else{
        res.sendStatus(404).end();
    }
})

app.get("/info", (req, res) => {
    let date = new Date()
    let msg = `<p>Phonebook has info for ${persons.length} people</p><br><p>${date}<p/>`
    
    
    res.send(msg)
})

app.post("/api/persons", (req, res) => {
    let id = (Math.random() * 1000).toFixed(0);

    let foundPersons = persons.filter( item => item.name === req.body.name)
    
    if(!req.body.name || !req.body.number){
        return res.status(400).json({error: "content missing"})
     
    }else if(foundPersons.length > 0){    
        return res.status(400).json({error: "Person allready exists"})
    }else {
        let newPers = {
            id: Number(id),
            name: req.body.name,
            number: req.body.number
        }
        
        persons.push(newPers)
        res.send(newPers)
    }


})


app.delete("/api/persons/:id", (req, res) => {
    persons = persons.filter( item => item.id !== Number(req.params.id))

    res.sendStatus(204).end();
})

app.put("/api/persons/:id" , (req, res) => {
    let id = Number(req.params.id);
    let newMan = {
        "id": id,
        "name" :req.body.name,
        "number" : req.body.number
    }
    console.log(newMan);
    persons = persons.filter( item => item.id !== id)
    persons.push(newMan)
    
    res.sendStatus(204).end();

    
})


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
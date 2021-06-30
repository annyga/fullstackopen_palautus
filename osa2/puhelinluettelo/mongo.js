const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({name: String, number: String});

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}else if(process.argv.length<4){
    const password = process.argv[2]

    const url = `mongodb+srv://DBanny:${password}@cluster0.3ghyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
       
    const Person = mongoose.model('Person', personSchema);

    Person.find({}).then( result => {
        console.log('Phonebook:')
        result.forEach( pers => { console.log(pers.name + ' ' + pers.number)})
        mongoose.connection.close()
    })
}else if(process.argv.length > 4){
    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    const url = `mongodb+srv://DBanny:${password}@cluster0.3ghyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    
   
    
    const Person = mongoose.model('Person', personSchema);
    
    const person = new Person({ 
        name: name,
        number: number
    })
    
    person.save().then( response => {
        console.log(`added ${person.name} number ${person.number} to the phonebook`);
        mongoose.connection.close();
    })
}






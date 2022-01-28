// Import expressjs for creating the server and creating api routes
const express = require('express')

// Body Parser for urlencoded form data 
const bodyParser = require('body-parser')

// Importing Mongo client
const MongoClient = require('mongodb').MongoClient 



// Creating app function from the express functional constructor to use it for creating
// server and apis
const app = express()

// Enabling body-Parser with urlencoded form data to be true
app.use(bodyParser.urlencoded({extended:true}))

//Setting ejs template engine
app.set('view engine' , 'ejs')

// Database Connection String
const connectionString ="mongodb+srv://chaithra13:chaithu13@cluster0.fiuey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// Connecting the database
MongoClient.connect(connectionString,{useUnifiedTopology:true})
 .then(client => {
     console.log('connected to database server')
     const db= client.db('star-wars-quotes')
     const quotesCollection = db.collection('quotes')
//Create with POST
// Two parameters first one route, second one is function what you want to execute
    app.post('/quotes', (req,res) => {
        quotesCollection.insertOne(req.body)
            .then(result=>{
                res.send(result)
            })
            .catch(error=>console.error(error))
        })

// Reading data from the MongoDB
    app.get('/getall',(req,res) => {
        //Finding the Collection quotes and changing the object to array of an objects
        db.collection('quotes').find().toArray()
        //waiting for the promise to send us the result back
        .then(result =>{
            res.render('index.ejs',{quotes:result})
        })
        //Waiting for the promise to send us the error back
        .catch(error=>console.error(error))
    })
        
 //Updating the data
    app.put('/updatequote',(req,res) => {
        quotesCollection = findOneAndUpdate()
        //waiting for the promise to send us the result back
        .then(result =>{
            res.send(result)
     })
        //Waiting for the promise to send us the error back
        .catch(error=>console.error(error))
    }) 

}).catch(console.error)  //MongoDB  Atlas cluster/server connection Error

//Here we are trying to send index.html file for the frontend client request from your body from data
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

// Creating the Server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`)
})
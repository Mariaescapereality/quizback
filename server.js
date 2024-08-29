require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//connect db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        console.log('erreur');
    }
    else{
        console.log("bravo maria")
    }
})

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3020;
app.listen(port, ()=>{
    console.log("serveur démarer yeah")

})
// commande node server.js


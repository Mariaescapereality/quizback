require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
app.use(bodyParser.json());

//connect db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

db.connect((err)=>{
    if(err){
        console.log('error');
    }
    else{
        console.log("bravo maria")
    }
})

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3020;
app.listen(port, ()=>{
    console.log("serveur on yeah")

})
// commande node server.js


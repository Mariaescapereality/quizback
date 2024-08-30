const express = require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const userMiddleWare = require('../middleware/users');
router.post('/sign-up', (req, res, next) => {});
router.post('/login', (req, res, next) => {});
router.get('/secret-route', (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!');
  });
const mysql = require('mysql2');
require('dotenv').config();




const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

router.get('/', (req, res) =>{
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results)=>{
        if(err) {
            return res.status(500)(err);
        }
        res.status(200).json(results);
    });
})

/*router.post('/new', (req, res) =>{
    const sql = 'INSERT INTO users (`username`, `password`,`name`,`firstname`) VALUES ("hostinger", "abc123456", "cupcake", "luckybasta");';
    db.query(sql, (err, results)=>{
        if(err) {
            return res.status(500)(err);
        }
        res.status(200).json(results);
    });
})*/

router.post('/register', async (req, res) =>{
    const { username, password, name, firstname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =`INSERT INTO users (username, password ,name, firstname) VALUES (?, ?, ?, ?);`
    db.query(sql, [username, hashedPassword, name, firstname], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        res.status(201).send({message: 'utilisateur créée'})
    });
})

router.post('/login', async (req, res) =>{

    let connexionDatabase = test();
    connexionDatabase.connect()
      
    const { username, password} = req.body;

    const sql =`SELECT password FROM users WHERE username = ?;`;
    
    db.query(sql, [username], (err, resultQueryPassword) =>{
        const Userpassword = resultQueryPassword[0];
        
        if(err){
            return res.status(500).send(err)
        }
        bcrypt.compare(password, Userpassword.password, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', result, err);
                return;
            }
        
            if (result) {
                // Passwords match, authentication successful
                res.status(201).send({
                    succes: "réussi",
                })
            } else {
                // Passwords don't match, authentication failed
                res.status(201).send({
                    succes: "pas le même mot de passe",
                })
            }
        });
    


    })
})

module.exports = router;
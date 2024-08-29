const express = require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();
const jwt = require('jsonwebtoken');



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

/*router.post('/login', async (req, res) =>{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =`SELECT (username, password) FROM users WHERE username=?;`
    db.query(sql, [username], (err,result) =>{
        if(err){
            return res.status(500).send(err)
        }
        res.status(201).send({
            message: username,
            password: password,
            succes: "reussi",
            result: result
        })
    });
})*/

/*router.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
    });
*/

/*router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = users.find(user => user.username === username);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    res.status(200).json({ message: 'Signin successful', user: { username: user.username } });
  });
*/

/*const users = [];

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =`SELECT (username, password) FROM users WHERE username=?;`;


    let user;
      
    user = user.find(users => users.username === username);
      
    if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      
    res.status(200).json({ message: 'Signin successful', user: { username: user.username } });
});*/
/*router.post('/signin', async (req, res) =>{
    try {
            const { username, password } = req.body
            const [user.username] = await pool.query("select * from users where email = ?", [username])
            if (!user[0]) return res.json({ error: "Invalid email!" })

            const { password: hash, id, name } = user[0]

            const check = await bcrypt.compare(password, hash)

            if (check) {
                const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({
                    accessToken,
                    data: {
                        name,
                        email
                    }
                })
            }
            return res.json({ error: "Wrong password!" })

        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
})*/
/*router.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
    })
 */

/*const storedHashedPassword = 'hashed_password_from_database';
const userInputPassword = 'password_attempt_from_user';

bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
    if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        return;
    }

if (result) {
    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');
} else {
    // Passwords don't match, authentication failed
    console.log('Passwords do not match! Authentication failed.');
}
});*/
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
    

    /*
    res.status(201).send({
        succes: "ok",
        motdepasseindiqué: password,
        aaaa: Userpassword
    })
       */ 


    })
})

module.exports = router;
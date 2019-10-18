const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgresDB = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'faceRecogDB'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => { login.handleLogin(req, res, postgresDB, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, postgresDB, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, postgresDB) })

app.put('/image', (req, res) => { image.handleImage(req, res, postgresDB) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, ()=> {
    console.log('Running in the 3000s');
})


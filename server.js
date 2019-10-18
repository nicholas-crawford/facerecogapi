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
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=> {
    res.send('We are doing it LIVE!');
})

app.post('/signin', (req, res) => { login.handleLogin(req, res, postgresDB, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, postgresDB, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, postgresDB) })

app.put('/image', (req, res) => { image.handleImage(req, res, postgresDB) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Running in the ${process.env.PORT}`);
})


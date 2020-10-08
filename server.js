const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./moviedex.json');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'
app.use(morgan(morganSetting))

app.use(function validateBearerToken(req, res, next) {
    const authToken = req.get('Authorization');
    const apiToken = process.env.API_TOKEN;
    console.log(authToken,apiToken);
    if(!authToken || authToken.split(' ')[0] !== "Bearer" || authToken.split(' ')[1] !== apiToken) {
        res.status(401).json({error: 'Unauthorized request'})
    }
    next();
})

//error handler
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

function handleGetMovies(req, res) {
    let movies = MOVIEDEX;

    if(req.query.genre) {
        movies = movies.filter( movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()))
    }

    if(req.query.country){
        movies = movies.filter( movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase()))
    }

    if(req.query.avg_vote){
        movies = movies.filter( movie => movie.avg_vote >= Number(req.query.avg_vote))
    }

    res.json(movies)

}

app.get('/movies', handleGetMovies);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {} )

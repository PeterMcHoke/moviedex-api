const express = require('express');
const morgan = require('morgan');
const MOVIEDEX = require('./moviedex.json');
const cors = require('cors');
const hemlet = require('helmet');
require('dovenv').config()

const app = express();
app.use(helmet());
app.use(cors());

app.use(morgan('dev'));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

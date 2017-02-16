const express = require('express');
const app = express();

const addingAuthPark = require('./models/park-schema');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/parks', addingAuthPark);



module.exports = app;
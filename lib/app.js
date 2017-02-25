const express = require('express');
const app = express();
const parks = require('./routes/park-routes');
const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth')();
const errorHandler = require('./error-handler');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/parks', ensureAuth, parks);


app.use(errorHandler);

module.exports = app;
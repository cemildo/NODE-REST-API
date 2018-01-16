const express = require('express');
const router = express.Router(); 
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const Modules = require('./models/index');
const app = express();

 
// set modules db
Modules.set(config.getDBConfig());

// enable all cors requests
app.use(cors()); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 

// this has to stay here
const angestellter = require('./routes/angestellter');
app.use('/', angestellter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { 
    res.status(err.status || 500);
    if (Number(err.status) !== 401) {
      console.error('Uncaught platform error', { error: err });
    }
    res.send({
      message: err.message,
      error: err,
    });
 
});

module.exports = app;

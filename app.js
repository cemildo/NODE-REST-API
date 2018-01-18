import express from 'express'; 
import favicon  from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser  from 'body-parser';
import cors  from 'cors';
import config  from './config';
import angestellter from './routes/angestellter';


const app = express();
 
app.use(config.getDBConfig); 
app.use('/', angestellter);
// enable all cors requests
app.use(cors()); 
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 

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

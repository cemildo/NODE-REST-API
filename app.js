import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser  from 'body-parser';
import config  from './config';
import angestellter from './routes/angestellter';


import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


const app = express();

// enable all cors requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(config.getDBConfig);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// enbale swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', express.Router());
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

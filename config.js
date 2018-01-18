
// DATABASE CONNECTION SETUP
import promise from 'bluebird'; 
import pgp from 'pg-promise';  
import models from './models';

const config = {};
let database = null;

config.getDBConfig = (req, res, next) => { 
    const options = {  promiseLib: promise };
    const fallback = 'postgres://tc:tc@192.168.1.25:5555/postgres';
    const connectionString = process.env.DATABASE_URL || fallback;
    if(!database) {
       database = pgp(options);
       database = database(connectionString);
       // pass databse connection to models here!
       models.set(database);
    }  
    next();
};

export default config;
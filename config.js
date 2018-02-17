
// DATABASE CONNECTION SETUP
import promise from 'bluebird';
import pgp from 'pg-promise';
import models from './models';

const config = {};
let database = null;

config.getDBConfig = (req, res, next) => {
    const options = {  promiseLib: promise };

    const fallback = 'postgres://username:pass@localhost:5432/db_name';
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

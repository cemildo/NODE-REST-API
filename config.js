
// DATABASE CONNECTION SETUP
const promise = require('bluebird');
const options = {  promiseLib: promise };
const pgp = require('pg-promise')(options);  

const getDBConfig = () => {
    const fallback = 'postgres://tc:tc@192.168.1.25:5555/postgres';
    const connectionString = process.env.DATABASE_URL || fallback;
    return pgp(connectionString); 
};

 
module.exports = {
    getDBConfig
}
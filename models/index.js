

const Angestellter = require('./Angestellter');
const models = {};

const set = (db) => {
    models.angestellter = new Angestellter.Model(db); 
};

const get = () =>  models;


module.exports = {
    set,
    get
};
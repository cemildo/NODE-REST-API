class Model{

    constructor(db){
        this.db = db;
     }

    findAll() {
        return this.db.any('select * from angestellter')
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                console.log('db error:', err);
                return next(err);
            });
    }

    getByPersonNr(personNr) { 
    return this.db.one('select * from angestellter where persnr = $1', personNr)
        .then(function (data) {
            return data;
        })
        .catch(function (err) {
        return next(err);
        });
    }
     
    createMember(person) {
        return this.db.none('insert into angestellter(name, tel, age, sex)' +
            'values(${name}, ${tel}, ${age}, ${sex})', person)
          .then(function () {
             return data;
          })
          .catch(function (err) {
            return next(err);
          });
      }

    updateMember(person) {
        return this.db.none('update angestellter set name=$1, tel=$2, salaer=$3, chef=$4, wohnort=$5, eintrittsdatum=$6, bonus=$7 where persnr=$8',
          [
            person.name,
            person.tel,
            person.salaer,
            person.chef,
            person.wohnort,
            person.eintrittsdatum,
            person.bonus, 
            parseInt(person.persnr)
          ])
          .then(function () {
            return true;
          })
          .catch(function (err) {
            return next(err);
          });
      }
      
    removeMember(personNr) { 
        return this.db.result('delete from angestellter where id = $1', personNr)
          .then(function (result) {
             return result;
          })
          .catch(function (err) {
            return next(err);
          });
      }  

}

module.exports = {
    Model
};
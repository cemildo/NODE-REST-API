import Promise from 'bluebird';

export default class Angestellter{

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
                return Promise.reject(err);
            });
    }

    getByPersonNr(personNr) { 
        return Promise.all([
                this.db.any(`select  abte.name as "abtName", abte.*, an.*, abtl.* 
                from angestellter an 
                JOIN abteilung abte on an.abtnr = abte.abtnr  
                JOIN abtleitung abtl on abte.abtnr = abtl.abtnr 
                where an.persnr = $1`, personNr),
                this.db.any(`select pz.startzeit as "pzStartZeit", pz.dauer as "pzDauer", pz.*, pr.* from projektzuteilung pz
                    FULL JOIN projekt pr on pz.projnr = pr.projnr
                    where pz.persnr = $1`, personNr),
            ])
            .then(function ([personal, job]) {  
                return {personal, job};
            })
            .catch(function (err) {
                return Promise.reject(err);
            });
    }
     
    createMember(person) {
        return this.db.none('insert into angestellter(name, tel, age, sex)' +
            'values(${name}, ${tel}, ${age}, ${sex})', person)
          .then(function (data) {
             return data;
          })
          .catch(function (err) {
            return Promise.reject(err);
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
            return Promise.reject(err);
          });
      }
      
    removeMember(personNr) { 
        return this.db.result('delete from angestellter where id = $1', personNr)
          .then(function (result) {
             return result;
          })
          .catch(function (err) {
            return Promise.reject(err);
          });
      }  

}

 
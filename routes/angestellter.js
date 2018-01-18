import models from '../models';
import express from 'express'; 
const router = express.Router(); 
 
  function getAllMembers(req, res, next) {
    models.get('angestellter').findAll()
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all members'
          });
      })
      .catch(function (err) {
        return next(err); 
      });
  }
  
  
  function getSingleMember(req, res, next) {
    var personNr = parseInt(req.params.id);
    
    models.get('angestellter').getByPersonNr(personNr)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE person'
          });
      })
      .catch(function (err) {
        res.status(404)
          .json({
            status: 'error', 
            message: err.message
          });
      });
  }
  
  // TODO
  function createMember(req, res, next) {
    req.body.age = parseInt(req.body.age);
    models.get('angestellter').createMember(req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one puppy'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  // TODO
  function updateMember(req, res, next) {
    models.get('angestellter').updateMember()
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated member'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
  // TODO
  function removeMember(req, res, next) {
    var pupID = parseInt(req.params.id);
    models.get('angestellter').removeMember()
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} puppy`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
  
   
  router.get('/api/members', getAllMembers);
  router.get('/api/members/:id', getSingleMember);
  router.post('/api/members', createMember);
  router.put('/api/members/:id', updateMember);
  router.delete('/api/members/:id', removeMember);
  
  module.exports = router; 

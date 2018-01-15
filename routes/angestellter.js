const Models = require("../models/index");
const express = require("express");
const router = express.Router();
const angestellterModel = Models.get().angestellter;

function getAllMembers(req, res, next) {
  angestellterModel.findAll()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all members'
        });
    })
    .catch(function (err) {
      console.log('db error:', err);
      return next(err);
    });
}


function getSingleMember(req, res, next) {
  var personNr = parseInt(req.params.id);
  
  angestellterModel.getByPersonNr(personNr)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// TODO
function createMember(req, res, next) {
  req.body.age = parseInt(req.body.age);
  angestellterModel.createMember(req.body)
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
  angestellterModel.updateMember()
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
  angestellterModel.removeMember()
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
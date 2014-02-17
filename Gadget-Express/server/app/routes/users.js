'use strict';

var User = require('../models/user');
var mongodb = require('mongodb');

exports.create = function(req, res){
  console.log(req);
  var db = global.mdb;
  var users = db.collection('users');

  var user = new User(req.body);
  users.insert(user, function(err, users){
    res.send(users[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  users.find().toArray(function(err, records){
    res.send({users:records});
  });
};

exports.update = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');

  var user = new User(req.body);
  var id = mongodb.ObjectID(req.params.id);
  var query = {_id: id};

  users.update(query, user, function(err, count){
    res.send({updated:count, id:req.params.id, user:user});
  });
};


'use strict';

var Gadget = require('../models/gadget');
//var mongodb = require('mongodb');

exports.create = function(req, res){
  console.log(req);
  var db = global.mdb;
  var gadgets = db.collection('gadgets');

  var gadget = new Gadget(req.body);
  gadgets.insert(gadget, function(err, gadgets){
    res.send(gadgets[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');
  
  gadgets.find().toArray(function(err, records){
    res.send({gadgets:records});
  });
};

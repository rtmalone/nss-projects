'use strict';

var Priority = require('../models/priority');

exports.create = function(req, res){
  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.index = function(req, res){
  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });
};

exports.show = function(req, res){
  Priority.findById(req.params.id, function(priority){
    res.send(priority);
  });
};

exports.update = function(req, res){
  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.destroy = function(req, res){
  Priority.deleteById(req.params.id, function(count){
    res.send({id:req.params.id, count:count});
  });
};


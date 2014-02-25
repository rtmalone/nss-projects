'use strict';

var Task = require('../models/task');

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.send(task);
  });
};

exports.index = function(req, res){
  Task.find(req.query, function(tasks){
    res.send({tasks:tasks});
  });
};

exports.update = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.send(task);
  });
};

exports.toggle = function(req, res){
  Task.findByIdAndToggleIsComplete(req.params.id, function(task){
    res.send(task);
  });
};


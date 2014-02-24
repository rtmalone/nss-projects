'use strict';

//var Mongo = require('mongodb');

var Todo;

exports.create = function(req, res){
  init();

  var todo = new Todo(req.body);
  todo.save(function(){
    res.send(todo);
  });
};

exports.filter = function(req, res){
  init();

  if(req.query.isComplete === 'true'){
    req.query.isComplete = true;
  }
  if(req.query.isComplete === 'false'){
    req.query.isComplete = false;
  }

  if(!req.query.limit){
    req.query.limit = 4;
  }
  if(!req.query.page){
    req.query.limit = 1;
  }
  if(!req.query.sort){
    req.query.sort = 'dueDate';
  }
  if(!req.query.order){
    req.query.order = 1;
  }

  Todo.findByFilter(req.query, function(todos){
    res.send({todos:todos});
  });
};

exports.index = function(req, res){
  init();

  Todo.findAll(function(todos){
    res.send({todos:todos});
  });
};

exports.show = function(req, res){
  init();

  Todo.findById(req.params.id, function(todo){
    res.send(todo);
  });
};

exports.update = function(req, res){
  init();
  var todo = new Todo(req.body);
  todo.save(function(){
    res.send(todo);
  });
};

exports.destroy = function(req, res){
  init();
  Todo.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};
function init(){
  Todo = global.nss.Todo;
}


'use strict';

module.exports = Todo;
var todo = global.nss.db.collection('todos');
var Mongo = require('mongodb');
var _ = require('lodash');

function Todo(todo){
  this._id = todo._id ? Mongo.ObjectID(todo._id) : null;
  this.priorityId = todo.priorityId ? Mongo.ObjectID(todo.priorityId) : null;
  this.task = todo.task;
  this.dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
  this.isComplete = !!todo.isComplete;
  this.tags = todo.tags || '';
  this.tags = this.tags.split(',').map(function(tag){return tag.trim();});
  this.tags = _.compact(this.tags);
}

Todo.prototype.save = function(fn){
  if(this.priorityId && this.task && this.dueDate){
    todo.save(this, function(err, record){
      fn(err);
    });
  }else{
    fn(new Error('Failed Validation'));
  }
};

Todo.find = function(query, fn){
  var limit = query.limit || 5;
  var skip = query.page ? (query.page - 1) * limit : 0;
  var filter = {};
  var sort = [];

  if(query.filterName === 'priorityId'){
    query.filterValue = Mongo.ObjectID(query.filterValue);
  }

  filter[query.filterName] = query.filterValue;

  if(query.sort){
    var direction = query.direction ? query.direction * 1 : 1;
    sort.push([query.sort, direction]);
  }

  todos.find(filter, {sort:sort, skip:skip, limit:limit}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByIdAndToggleIsComplete = function(id, fn){
  var _id = Mongo.ObjectID(id);

  todos.findOne({_id:_id}, function(err, todo){
    todo.isComplete = !todo.isComplete;

    todos.save(todo, function(err){
      fn(todo);
    });
  });
};


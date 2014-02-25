'use strict';

module.exports = Task;
var tasks = global.nss.db.collection('tasks');
var Mongo = require('mongodb');
var _ = require('lodash');

function Task(task){
  this._id = task._id ? Mongo.ObjectID(task._id) : null;
  this.priorityId = task.priorityId ? Mongo.ObjectID(task.priorityId) : null;
  this.title = task.title;
  this.dueDate = task.dueDate ? new Date(task.dueDate) : null;
  this.isComplete = !!task.isComplete;
  this.tags = task.tags || '';
  this.tags = this.tags.split(',').map(function(tag){return tag.trim();});
  this.tags = _.compact(this.tags);
}

Task.prototype.save = function(fn){
  if(this.priorityId && this.title && this.dueDate){
    tasks.save(this, function(err, record){
      fn(err);
    });
  }else{
    fn(new Error('Failed Validation'));
  }
};

Task.find = function(query, fn){
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

  tasks.find(filter, {sort:sort, skip:skip, limit:limit}).toArray(function(err, records){
    fn(records);
  });
};

Task.findByIdAndToggleIsComplete = function(id, fn){
  var _id = Mongo.ObjectID(id);

  tasks.findOne({_id:_id}, function(err, task){
    task.isComplete = !task.isComplete;

    tasks.save(task, function(err){
      fn(task);
    });
  });
};


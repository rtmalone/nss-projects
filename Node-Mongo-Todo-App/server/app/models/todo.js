'use strict';

module.exports = Todo;
var todos = global.nss.db.collection('todos');
//var priorities = global.nss.db.collection('priorities');

var Mongo = require('mongodb');

function Todo(todo){
  this._id = todo._id;
  this.task = todo.task;
  this.dueDate = new Date(todo.dueDate);
  this.isComplete = todo.isComplete;
  this.tags = todo.tags || [];
  this.priorityId = todo.priorityId;
}

Todo.prototype.save = function(fn){
  var self = this;

  if(self._id){
    todos.save(self, function(err, record){
      fn(err);
    });
  }else{
    Todo.findById(self._id, function(todo){
      if(!todo){
        todos.save(self, function(err, record){
          fn(err);
        });
      }else{
        fn(new Error('Duplicate Todo'));
      }
    });
  }
};

Todo.findByComplete = function(bool, fn){
  todos.find({isComplete:bool}).toArray(function(err, records){
    fn(records);
  });
};

Todo.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

Todo.findAll = function(fn){
  todos.find().toArray(function(err, records){
    fn(records);
  });
};
/*
Todo.findByTask = function(task, fn){
  todos.findOne({task:task}, function(err, record){
    fn(record ? new Todo(record) : null);
  });
};
*/
Todo.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.findOne({_id:_id}, function(err, record){
    fn(record ? new Todo(record) : null);
  });
};

Todo.findByPriority = function(priorityId, fn){
  todos.findOne({priorityId:priorityId}, function(err, record){
    fn(record);
  });
};

Todo.findByTag = function(tag, fn){
  todos.findOne({tags: {$in: [tag] }}, function(err, record){
    fn(record);
  });
};

Todo.findByFilter = function(data, fn){
  todos.find(data).toArray(function(err, records){
    fn(records);
  });
};

Todo.sortByDueDate = function(fn){
  todos.find().sort({dueDate:1}, function(err, records){
    fn(records);
  });
};

Todo.findByDueDate = function(data, fn){
  todos.find(data).toArray(function(err, records){
    fn(records);
  });
};

/*
Todo.sortByPriority = function(`fn){
  var foundPriority;
  var _id = Mongo.ObjectID(id);
  priorities.findAll(function(err, records){
    foundPriorities = records;
  });
  todos.find().sort({}, function(err, records){
    fn(records);
  });
};

Todo.pagging = function(perPage, fn){

};*/



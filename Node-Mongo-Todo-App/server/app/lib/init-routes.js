'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var priorities = require('../routes/priorities');
  var tasks = require('../routes/tasks');
//-- pipeline begins
  app.get('/', d, home.index);
  app.post('/priorities', d, priorities.create);
  app.get('/priorities', d, priorities.index);
  app.get('/priorities/:id', d, priorities.show);
  app.put('/priorities/:id', d, priorities.update);
  app.del('/priorities/:id', d, priorities.destroy);

//--- task pipeline
  app.post('/tasks', d, tasks.create);
  app.get('/tasks', d, tasks.index);
  app.put('/tasks/:id', d, tasks.update);
  app.put('/tasks/toggle/:id', d, tasks.toggle);
  console.log('Routes Loaded');
  fn();
}


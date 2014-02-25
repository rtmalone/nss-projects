'use strict';

var Priority;

exports.create = function(req, res){
  init();

  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.index = function(req, res){
  init();

  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });
};

exports.show = function(req, res){
  init();

  Priority.findById(req.params.id, function(priority){
    res.send(priority);
  });
};

exports.update = function(req, res){
  init();

  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.destroy = function(req, res){
  init();
  Priority.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};

function init(){
  Priority = global.nss.Priority;
}


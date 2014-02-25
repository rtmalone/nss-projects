'use strict';

var mongoClient = require('./mongodb-connection-pool');
var isInitialized = false;

module.exports = function(req, res, next){
  if(!isInitialized){
    isInitialized = true;
    mongoClient(process.env.DBNAME, function(){
      next();
    });
  } else {
    next();
  }
};


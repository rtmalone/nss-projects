/* jshint unused:false */


var User = function(){
  'use strict';

  var purchases = [];

  module.exports = function User(user){
    this.name = user.name || '';
    this.balance = user.balance || '';
  };
};

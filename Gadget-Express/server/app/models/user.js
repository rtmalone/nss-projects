'use strict';

module.exports = function User(user){
  this.name = user.name || '';
  this.balance = user.balance || '';
  this.purchases = [];
};

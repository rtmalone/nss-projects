/* jshint unused:false */

'use strict';

module.exports = function User(user, purchases){
  this.name = user.name || '';
  this.balance = parseInt(user.balance || 0);
  this.purchases = purchases;
};

/*
  User.prototype.addPurchase = function(purchase){
    purchases.push(purchase);
  };

  return User;
*/

'use strict';

module.exports = function Gadget(gadget){
  this.name = gadget.name || '';
  this.price = parseInt(gadget.price || 0);
  this.stock = parseInt(gadget.stock || 0);
};

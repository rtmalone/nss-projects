'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  var random = _.random(2, 10);
  var flags = _.sample(global.flags, random);
  var countries = _.shuffle(flags);
  res.render('home/index', {title: 'Know Your Flags', flags:flags, countries:countries});
};


'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  //var random = _.random(2, 10);
  var flags = _.sample(global.flags, 10);
  var countries = _.shuffle(flags);
  res.render('home/index', {title: 'Know Your Flags', flags:flags, countries:countries});
};

exports.match = function(req, res){
  console.log(req.query);

  var country = req.query.country;
  var flag = req.query.flag;
  console.log('country >'+country);
  console.log('flag >'+flag);

  var matched = _.find(global.flags, function(flags){
    return flags.country === country;
  });
  if(matched.flag === flag){
    res.send({country:country, flag:flag});
  } else {
    res.send({country:false, flag:false});
  }
 
};


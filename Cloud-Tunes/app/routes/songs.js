'use strict';
var Song = require('../models/song');
//var moment = require('moment');

exports.create = function(req, res){
  var song = new Song(req.body);
  console.log(req.body);
  song.save(function(){
    res.send(song);
  });
};

exports.update = function(req, res){
  var song = new Song(req.body);
  song.save(function(){
    res.send(song);
  });
};

exports.index = function(req, res){
  Song.findAll(function(songs){
    res.send({songs:songs});
  });
};

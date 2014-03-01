'use strict';
var Album = require('../models/album');
//var moment = require('moment');

exports.create = function(req, res){
  var album = new Album(req.body);
  console.log(req.body);
  album.save(function(){
    res.send(album);
  });
};

exports.update = function(req, res){
  var album = new Album(req.body);
  album.save(function(){
    res.send(album);
  });
};

exports.index = function(req, res){
  Album.findAll(function(albums){
    res.send({albums:albums});
  });
};

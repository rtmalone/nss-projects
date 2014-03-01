'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var songs = require('../routes/songs');
  var albums = require('../routes/albums');
  var artists = require('../routes/artists');

  app.get('/', d, home.index);
  app.get('/songs', d, songs.index);
  app.post('/songs', d, songs.create);
  app.put('/songs', d, songs.update);
  app.get('/albums', d, albums.index);
  app.post('/albums', d, albums.create);
  app.put('/albums', d, albums.update);
  app.get('/artists', d, artists.index);
  app.post('/artists', d, artists.create);
  app.put('/artists', d, artists.update);
  console.log('Routes Loaded');
  fn();
}


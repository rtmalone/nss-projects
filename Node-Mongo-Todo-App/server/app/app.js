'use strict';

var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var cors = require('./lib/cors');
var initMongo = require('./lib/init-mongo');
var initRoutes = require('./lib/init-routes');

var express = require('express');
var app = express();

/* --- pipeline begins */
app.use(initMongo.connect);
app.use(initRoutes);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(cors);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;


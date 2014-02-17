'use strict';

var dbname = 'GE';
var port = process.env.PORT || 4000;

var d = require('./lib/request-debug');
var connectMongo = require('./lib/mongodb-connection-pool').initialize(dbname);

var express = require('express');
var home = require('./routes/home');
var users = require('./routes/users');
var gadgets = require('./routes/gadgets');
var app = express();

/* --- pipeline begins */
app.use(connectMongo);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(require('./lib/cors'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', d, home.index);
app.post('/users', d, users.create);
app.get('/users', d, users.index);
app.post('/gadgets', d, gadgets.create);
app.get('/gadgets', d, gadgets.index);
app.put('/gadgets/:id', d, gadgets.update);
app.put('/users/:id', d, users.update);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});


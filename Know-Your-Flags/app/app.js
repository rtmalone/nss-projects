'use strict';

//--- Answers
var f1 = {country:'USA', flag: 'us'};
var f2 = {country:'Canada', flag:'ca'};
var f3 = {country:'Russia', flag:'ru'};
var f4 = {country:'Italy', flag: 'it'};
var f5 = {country:'France', flag: 'fr'};
var f6 = {country:'Zimbabwe', flag: 'zw'};
var f7 = {country:'New Zealand', flag: 'nz'};
var f8 = {country:'Iran', flag: 'ir'};
var f9 = {country:'Tuvalu', flag: 'tv'};
var f10 = {country:'Somalia', flag: 'so'};
var f11 = {country:'Belgium', flag: 'be'};
var f12 = {country:'Albania', flag: 'al'};
var f13 = {country:'Niger', flag: 'ne'};
var f14 = {country:'Oman', flag: 'om'};
var f15 = {country:'Panama', flag: 'pa'};

global.flags =[f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15];



var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

var express = require('express');
var app = express();
var less = require('express-less');
var RedisStore = require('connect-redis')(express);
var initMongo = require('./lib/init-mongo');
var initRoutes = require('./lib/init-routes');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --- pipeline begins */
app.use(initMongo.connect);
app.use(initRoutes);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(express.favicon());
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  store : new RedisStore({host: 'localhost', port: 6379}),
  secret: 'change-this-to-a-super-secret-message',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(app.router);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;


var config = require("./server/config/config");
var util = require("./server/util/util.js");
var routes = require('./server/routes/routes');
var data = require('./server/model/seed');
var express = require('express');
var bodyParser = require('body-parser');

util.test('ready');
var configuration = config.configuration();

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use('/', routes.router);

util.test('steady');
app.listen(3000);
util.test('go');
'use strict';

var express = require('express');
// var expressKerberos = require('express-kerberos');
var expressAuthNegotiate = require('express-auth-negotiate');

var app = express()

var middleware = function(req, res, next) {
    var auth = req.get('authorization');
		console.log('me is middle', auth)
    if (!auth) {
      return res.status(401).set('WWW-Authenticate', 'Negotiate').end();
    }

    if (auth.lastIndexOf('Negotiate') !== 0) {
      return next(new Error(400, 'Malformed authentication token auth ' + auth));
    }

    req.auth = req.auth || {};
    req.auth.token = auth.substring('Negotiate '.length);

    next();
  };

app.get('/testing', middleware, function(req, res, next) {
	console.log('tesst 1')
  res.send('Hello ' + req.auth.username);
});

app.get('/tester', function(req, res) {
	console.log('tesst 2');
	res.send('hello2 ')
});


app.listen(8080, function () {
  console.log('Example app listening on port!')
})

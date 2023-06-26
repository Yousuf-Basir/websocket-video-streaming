var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// When a new WebSocket connection is established
wss.on('connection', (ws) => {
  // Add the client to the set of connected clients
  clients.add(ws);

  // When data is received from the broadcasting client
  ws.on('message', (data) => {
    console.log("🚀 ~ file: app.js:56 ~ ws.on ~ data:", data)
    
    // Broadcast the received data to all connected viewers
    for (const client of clients) {
      // Skip the broadcasting client itself
      // if (client !== ws) {
      //   client.send(data);
      // }

      client.send(data);
    }
  });

  // When the WebSocket connection is closed
  ws.on('close', () => {
    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

module.exports = app;

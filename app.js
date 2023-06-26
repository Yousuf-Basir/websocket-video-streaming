var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');
const fs = require('fs');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/', indexRouter);

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8123 });

// Store connected clients
const clients = new Set();

// When a new WebSocket connection is established
wss.on('connection', (ws) => {
  // Add the client to the set of connected clients
  clients.add(ws);

  // When data is received from the broadcasting client
  ws.on('message', (data) => {
    // Broadcast the received data to all connected viewers
    for (const client of clients) {
      // Skip the broadcasting client itself
      if (client !== ws) {
        client.send(data);
      }
    }
  });

  // When the WebSocket connection is closed
  ws.on('close', () => {
    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

module.exports = app;

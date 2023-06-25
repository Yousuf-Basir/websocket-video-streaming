var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// sendFile will go here
router.get('/stream', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'frontend', 'index.html'));
});




module.exports = router;

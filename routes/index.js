var express = require('express');
var router = express.Router();
const conn = require('../config/db.js');

router.get('/', function (req, res, next){
  var sql = 'SELECT * FROM carrier'
  conn.query(sql, function(error, results, fields){
    res.render('index', {results: results})
  })
})


module.exports = router;

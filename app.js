const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/db.js');
const bodyParser = require('body-parser');



// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//
//   console.log('connected as id ' + connection.threadId);
// });


app.set('view engine', 'ejs');

// bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/request', require('./routes/request'));
app.use('/myreservation', require('./routes/myreservation'));
app.use('/mobileDevices', require('./routes/mobileDevices'));
app.use('/test', require('./routes/test'));
var querysql = 'SELECT * FROM vendor WHERE vendorID = 2';
app.get('/mysql', function(req, res, next){
  db.query(querysql, function(error, results, fields){
    res.send(results);
  })
})


app.listen(8000, function () {
  console.log('Example app listening on port 3000!')
})

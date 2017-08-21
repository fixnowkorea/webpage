const mysql      = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'fixnow-test-rds-mysql.c0ph3gwuntnv.ap-northeast-2.rds.amazonaws.com',
  user     : 'fixnow',
  password : 'fixnow1234',
  database : 'fixnow_test_db',
  connectTimeout: 10000
});

pool.getConnection(function(err) {
  if (err) throw err;
  console.log('pool connection success!')
});

module.exports = pool;

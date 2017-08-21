var express = require('express');
var router = express.Router();
const pool = require('../config/db.js');

router.get('/', function(req, res, next){

  res.render('./myreservation')

})

router.post('/', function(req, res, next){
  var requestName = req.body.requestName;
  var requestNumber = req.body.requestNumber;

  var sql = "SELECT * FROM request_info WHERE name='" + requestName + "' AND phonenumber=" + requestNumber
  // var sql = "SELECT * FROM request_info WHERE name='이름테스트' AND phonenumber=12341234"

  pool.getConnection(function(err, connection) {
    connection.query(sql, function(error, results, fields){
      if (error) throw error;

      res.render('./myreservation', {result: results});
      console.log('이거 되면 아래 결과가 나온다')
      console.log(results)



    })
  })

})



module.exports = router;


// myreservation ejs파일에 들어갈 내용인데
// <p>
//   <%= result[0].request_infoID %><br />
//   <%= result[0].date %><br />
//   <%= result[0].time %><br />
//   <%= result[0].name %><br />
//   <%= result[0].phonenumber %><br />
//   <%= result[0].address1 %> + <%= result[0].address2 %><br />
//   <%= result[0].device %><br />
//   <%= result[0].color %><br />
//   <%= result[0].issue %><br />
// </p>
// 이렇게 부르는 거다.

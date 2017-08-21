var express = require('express');
var router = express.Router();
const pool = require('../config/db.js');
var moment = require('moment');
//모멘트 한글 언어팩 설치 localization i18n

router.get('/', function(req, res, next) {
  var obj = {};
  var sql = 'SELECT * FROM repair_device'
  pool.getConnection(function(err, connection) {
    connection.query(sql, function(error, results, fields){
      if (error) throw error;
      obj = {device : results}

      connection.query('SELECT * FROM carrier', function(error, result1, fields){
        if (error) throw error;
        carrier = result1;

        connection.query('SELECT * FROM repair_issue', function(error, result2, fields){
          if (error) throw error;
          issue = result2;

          connection.query('SELECT d.name, c.device_id, c.color FROM device_color AS c LEFT JOIN repair_device AS d ON c.device_id = d.repair_deviceID WHERE device_id = 3' ,function(error, result3, field){
            if (error) throw error;
            color = result3;

            var obj = {};
            obj.device = results;
            obj.carrier = result1;
            obj.issue = result2;
            obj.color = result3;



            //moment.js로 오늘 포함한 앞으로 n개의 날짜를 가져옴.
            //obj.available_days = [];
            //add함수
            //format함수 활용

            var today = moment.utc();
            var day1 = moment().add(1, 'days');
            var day2 = moment().add(2, 'days');
            var day3 = moment().add(3, 'days');
            var day4 = moment().add(4, 'days');

            obj.available_days = [
              today,
              day1,
              day2,
              day3,
              day4
            ]


            //가능한 시간 슬롯
            obj.available_time_slot = [];




            res.render('./request', obj)
            console.log(obj)

          })
        })
      })
    })
  })
});

router.post('/', function(req, res, next){

  var rname = req.body.request_name;
  var rdate = req.body.request_date;
  var rhour = req.body.request_hour;
  var rnumber = req.body.request_number;
  var raddress1 = req.body.request_address1;
  var raddress2 = req.body.request_address2;
  var dname = req.body.device_name;
  var did = req.body.device_id;
  var dcolor = req.body.device_color;
  var dissue = req.body.device_issue;
  var ddescription = req.body.device_description;

  // req.body에 들어왔으니, 이제 여기서 mysql로 저장하는 코드를 쓰면 된다.
  pool.getConnection(function(err, connection) {

    connection.query("INSERT INTO fixnow_test_db.request_info (name, date, time, phonenumber, address1, address2, device, device_id, color, issue, description) VALUES ('" +rname+ "', '" +rdate+ "', '" +rhour+ "', '" +rnumber+ "', '" +raddress1+ "', '" +raddress2+  "', '" +dname+ "', '" +did+ "', '" +dcolor+ "', '" +dissue+ "', '" +ddescription+ "')", function(error, results, field){
      if (error) throw error;
      console.log('done');
    });

  })


})


router.get('/request_complete', function(req, res, next){
  res.render('./request/request_complete');
})

module.exports = router;

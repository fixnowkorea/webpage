const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
  res.render('./mobileDevices/index')
});

router.get('/carrier', function(req, res, next){
  res.render('./mobileDevices/carrier')
});





module.exports = router;

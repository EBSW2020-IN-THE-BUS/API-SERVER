const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs= require('fs');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(__dirname+'/'));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ebsw1!',
    database : 'EBSW_API',
    port     : '3306'
  });

function responseFormat(status, msg, data){
  return{
    status: status,
    msg: msg,
    data: data
  }
};

router.get('/login-success/:routeId/:vehicleNo/reserve-info',function(req,res){
  var routeId=req.params.routeId;
  var vehicleNo= req.params.vehicleNo;
  var json=fs.readFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/routeData/${routeId}.json`);
  var data= JSON.parse(json);
  connection.query('select *from reserveInfo where vehicleNo=?',[vehicleNo], function(err,rows){ 
    rowData=JSON.stringify({
      "vehicleNo": rows.vehicleNo,
      "stationID": rows.stationID,
      "stationName": rows.stationName
    });
    res.json(responseFormat(true, "", data+rows));
  })
});

module.exports = router;

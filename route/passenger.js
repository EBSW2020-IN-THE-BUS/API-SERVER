const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs= require('fs');
const HttpStatus= require('http');
const { json } = require('body-parser');

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


  router.get('/routeInfo/:routeId',function(req,res){
    routeId=req.params.routeId;
    var json=fs.readFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/routeData/${routeId}.json`);
    var data= JSON.parse(json);
    console.log(data); 
    res.json(responseFormat(true, "Success log-in", data));
  });


  router.get('/stationInfo/:stationId',function(req,res){
      stationId=req.params.stationId;
      var json=fs.readFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/stationData/${stationId}.json`);
      var data= JSON.parse(json);
      console.log(data); 
      res.json(responseFormat(true, "", data));
  });


  router.get('/info/:routeId',function(req,res){
      routeId=req.params.routeId;
      var json=fs.readFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/dispatchData/D${routeId}.json`);
      var data= JSON.parse(json);
      console.log(data); 
      res.json(responseFormat(true, "...", data));
  });


  router.post('/get_off/reserve',function(req,res){  
      var body= req.body;
      var params= [body.stationId, body.vehicleNo, body.stationName];
      var resmsg=JSON.stringify({
          "status": true,
          "msg" : "reserve Ok"
      });
      connection.query('INSERT INTO reserveInfo VALUE(?, ?, ?)',params,function(err,rows){
        if(err) throw err;
        else console.log(rows);
        res.send(resmsg);
      })
  });

  module.exports = router;
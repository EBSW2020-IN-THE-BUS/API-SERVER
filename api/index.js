//공공데이터를 받아오기위한 api directory의 index.js파일임
var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var fs=require('fs');

var app=express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/'));

var busType= './js/busType.js';
var route= './js/route.js';
var station= './js/station.js';

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ebsw1!',
    database : 'EBSW_API',
    port     : '3306'
  });

  

  


// station DB 에 데이터 넣는 과정
  // connection.connect(function(err){  
  //   if (err)   console.log(err);
  //   else       console.log("Connected");
  //   var sql='select *from route';
  //   connection.query(sql,function(err,rows){
  //     if(err) throw err;
  //     for(var i=0; i<rows.length; i++){
  //      var routeId= rows[i].routeId;
  //      var sql2=`LOAD XML LOCAL INFILE '/home/ebsw/ebsw-API-server/EBSW_test/api/xmlData/${routeId}.xml' INTO TABLE station ROWS IDENTIFIED BY '<busRouteStationList>'`;
  //       connection.query(sql2,function(err,rows2){
  //         if(err) throw err;
  //         console.log(rows2);
  //       });
  //     }
  //   });
    
   
 // dispatch 테이블에 넣는 과정
  // connection.connect(function(err){  
  //   if (err)   console.log(err);
  //   else       console.log("Connected");
  //   var sql='select *from route';
  //   connection.query(sql,function(err,rows){
  //     if(err) throw err;
  //     for(var i=0; i<rows.length; i++){
  //      var routeid= rows[i].routeId;
  //      var sql2=`LOAD XML LOCAL INFILE '/home/ebsw/ebsw-API-server/EBSW_test/api/dispatchData/D${routeid}.xml' INTO TABLE dispatch ROWS IDENTIFIED BY '<busRouteInfoItem>'`;
  //       connection.query(sql2,function(err,rows2){
  //         if(err) throw err;
  //         console.log(rows2);
  //       });
  //     }
  //   });



  
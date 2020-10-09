const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs= require('fs');
var request = require('request');
var convert= require('xml-js');
var driver = require('./route/driver');
var passenger = require('./route/passenger');
var port= 8080;


var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send({status:500, message:'internet error', type:'internal'});
});

app.use('/driver', driver);
app.use('/passenger', passenger);

//버스 도착 정보를 받아오기위한 함수 
function ArriveData(i){
  connection.query('select *from route', function(err,rows){
      var routeid=rows[i].routeId;
      var uri = 'http://openapi.gbis.go.kr/ws/rest/buslocationservice';
      var queryParams = '?' + encodeURIComponent('serviceKey') + '=zrMzTNK%2BXPLjh1l7ctWyVSWVsHtBJ90tw79Bp6a%2B4p7Up33UeO3GojWL6yYasJ5EeQbEHtI0RvEW7lXgbnfbEA%3D%3D';
      queryParams= queryParams + '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent(routeid); 
      request({
          url: uri + queryParams,
          method: 'GET'
      }, function (error, response, body) {
          console.log('Status', response.statusCode);
          // console.log('Headers', JSON.stringify(response.headers));
          // console.log('Reponse received', body);
          var removeJsonTextAttribute = function(value, parentElement) {
              try {
                var keyNo = Object.keys(parentElement._parent).length;
                var keyName = Object.keys(parentElement._parent)[keyNo - 1];
                parentElement._parent[keyName] = nativeType(value);
              } catch (e) {}
            };
            var options = {
              compact: true,
              trim: true,
              ignoreDeclaration: true,
              ignoreInstruction: true,
              spaces: 4
            };
          var xmlToJson = convert.xml2json(body, options, removeJsonTextAttribute);
          console.log(`xml to json => ${xmlToJson}`);
          fs.writeFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/busArriveData/A${routeid}.json`, xmlToJson);
      });
  })
}



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ebsw1!',
  database : 'EBSW_API',
  port     : '3306'
});

connection.connect(function(err){  
  if (err)   console.log(err);
  else       console.log("Connected");
});

// setInterval 함수를 이용하여 일정하게 받아옴
// setInterval(function(){
//   connection.query('select *from route', function(err,rows){
//         for(var i=0; i<rows.length; i++){
//             ArriveData(i);
//         }
//     });
// },60000);



app.listen(port, function() {
  console.log(`app listening on port` + port);
});
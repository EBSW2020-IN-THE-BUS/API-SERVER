// 실시간 버스도착정보에 대한 공공데이터 불러오기 위함
var request = require('request');
var convert= require('xml-js');
var fs= require('fs');
var mysql= require('mysql');




var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ebsw1!',
    database : 'EBSW_API',
    port     : '3306'
  });


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


setInterval(function(){
  connection.query('select *from route', function(err,rows){
        for(var i=0; i<rows.length; i++){
            ArriveData(i);
        }
    });
},1000);
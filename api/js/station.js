// stationId의 정류소에 관한 공공데이터를 불러오기 위함
var request = require('request');
var convert= require('xml-js');
var fs= require('fs');
var mysql= require('mysql');


function stationData(i){
    connection.query('select *from station', function(err,rows){
        var stationname=rows[i].stationName;
        var stationid=rows[i].stationId;
        var uri = 'http://openapi.gbis.go.kr/ws/rest/busstationservice';
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' +'zrMzTNK%2BXPLjh1l7ctWyVSWVsHtBJ90tw79Bp6a%2B4p7Up33UeO3GojWL6yYasJ5EeQbEHtI0RvEW7lXgbnfbEA%3D%3D';
        queryParams= queryParams + '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(stationname); 
        var options={
            url : uri+queryParams,
            method : 'GET'
        }

        

        request(options ,function (error, response, body) {
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
            var xmlToJson = convert.xml2json(body, options,removeJsonTextAttribute);
            console.log(`xml to json => ${xmlToJson}`);
            fs.writeFileSync(`/home/ebsw/ebsw-API-server/EBSW_test/api/stationData/${stationid}.json`, xmlToJson);
        });
    });
}

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ebsw1!',
    database : 'EBSW_API',
    port     : '3306'
  });



  connection.query('select *from station', function(err,rows){
    for(var i=0; i<rows.length; i++){
         stationData(i);
    }
});



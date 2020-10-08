//광역버스 노선번호 공공데이터를 불러오기 위함
var request = require('request');
var convert= require('xml-js');
var fs= require('fs');
var uri = 'http://openapi.gbis.go.kr/ws/rest/busrouteservice';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=zrMzTNK%2BXPLjh1l7ctWyVSWVsHtBJ90tw79Bp6a%2B4p7Up33UeO3GojWL6yYasJ5EeQbEHtI0RvEW7lXgbnfbEA%3D%3D';
queryParams= queryParams + '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent('M'); 

request({
    url: uri + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    // console.log('Headers', JSON.stringify(response.headers));
    // console.log('Reponse received', body);
    // var xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
    console.log(`xml to json => ${body}`);
    fs.writeFileSync('/home/ebsw/ebsw-API-server/EBSW_test/api/xmlData/busType.xml', body);
});



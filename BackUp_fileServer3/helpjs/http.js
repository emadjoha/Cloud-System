request = require('request');

var myJSONObject = {};
request({
    url: "http://localhost:8080/api/size",
    method: "get",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    console.log(body);
});
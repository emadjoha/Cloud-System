var https = require('https');

var options = {
  host: 'localhost',
  port: 8080,
  path: '/size',
  method: 'GET'
};

var req = https.request(options, function(res) {
  console.log(res.statusCode);
  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
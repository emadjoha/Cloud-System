const https = require('https');

https.get('localhost:8080/url',
res => {
console.log('dddddddddddddddddddddddddddddddddd');
console.log(res.headers
    );
});

/*const https = require('https');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET'
};

rm -rf node_modules
npm install -g npm@latest
npm i core-util-is
const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();/
*/
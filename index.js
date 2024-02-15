const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/get_cities',
    method: 'POST'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const cities = JSON.parse(data);
        console.log('Cities in Finland:', cities);
    });
});

req.end();
req.on('error', (error) => {
    console.error('Error:', error.message);
});

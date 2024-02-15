const http = require('http');
const {parse} = require('url'); // For parsing URL parameters

// Server connection details
const hostname = 'localhost';
const port = 8080; // Adjust if using a different port
const path = '/get_average_expense';

// Function to send an RPC request and get city average expense
async function getAverageExpense(city) {
    const postData = JSON.stringify({city_name: city});

    const options = {
        hostname,
        port,
        path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.hasOwnProperty('average_expense')) {
                        resolve(response.average_expense);
                    } else {
                        reject(new Error('Error: City not found'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Example usage: Get average expense for a city
var cityname = 'Oulu'
getAverageExpense(cityname)
    .then((expense) => {
        console.log(`Average expense in ${cityname}: ${expense}`);
    })
    .catch((error) => {
        console.error(error.message);
    });

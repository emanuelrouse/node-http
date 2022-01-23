const http = require('http'); // import http(core) module

const hostname = 'localhost'; // set hostname to localhost
const port = 3000; // set the port number to 3000

const path = require('path'); // import path(core) module
const fs = require('fs');  // import fs(core) module

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200; // send a ok response back to the server
    res.setHeader('Content-Type', 'text/html'); // client: What kind of data to expect in the response body? 
    res.end('<html><body><h1>Hello World!</h1></body></html>'); // close the response stream
});
// create a new instance of the Http.Server class
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)});

